import type { LeadInput, ProviderResult } from './types';

// ─── Config ───────────────────────────────────────────────────────────────────

const BASE    = 'https://api.hubapi.com';
const TOKEN   = process.env.HUBSPOT_ACCESS_TOKEN;
const PIPELINE = process.env.HUBSPOT_PIPELINE_ID      ?? 'default';
const STAGE    = process.env.HUBSPOT_NEW_LEAD_STAGE_ID ?? 'appointmentscheduled';

// ─── Phone normalization ──────────────────────────────────────────────────────

export function normalizeSaudiPhone(raw: string): string {
  // Strip formatting characters
  const clean = raw.replace(/[\s\-().]/g, '');

  if (clean.startsWith('+966'))   return clean;
  if (clean.startsWith('00966'))  return '+' + clean.slice(2);
  if (clean.startsWith('966') && clean.length === 12) return '+' + clean;
  if (/^05\d{8}$/.test(clean))   return '+966' + clean.slice(1);   // 05xxxxxxxx
  if (/^5\d{8}$/.test(clean))    return '+966' + clean;            // 5xxxxxxxx
  return clean; // can't normalize — return cleaned
}

// ─── Low-level HTTP helper ────────────────────────────────────────────────────

interface HsResponse<T = unknown> {
  ok:     boolean;
  status: number;
  data:   T | null;
  error?: string;
}

async function hs<T = unknown>(
  method: 'GET' | 'POST' | 'PATCH' | 'PUT',
  path:   string,
  body?:  unknown,
): Promise<HsResponse<T>> {
  if (!TOKEN) return { ok: false, status: 0, data: null, error: 'HUBSPOT_ACCESS_TOKEN not set' };

  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        Authorization:  `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body != null ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    let data: T | null = null;
    try { data = JSON.parse(text) as T; } catch { /* non-JSON response */ }

    if (!res.ok) {
      console.error(`[HubSpot] ${method} ${path} → ${res.status}`, text.slice(0, 300));
      return { ok: false, status: res.status, data, error: `HubSpot ${res.status}` };
    }

    return { ok: true, status: res.status, data };
  } catch (err) {
    console.error(`[HubSpot] fetch failed for ${path}:`, err);
    return { ok: false, status: 0, data: null, error: 'network error' };
  }
}

// ─── Contact ─────────────────────────────────────────────────────────────────

interface HsContact { id: string; properties: Record<string, string> }
interface HsSearchResult { results: HsContact[]; total: number }

async function findContactByPhone(phone: string): Promise<string | null> {
  const res = await hs<HsSearchResult>('POST', '/crm/v3/objects/contacts/search', {
    filterGroups: [{
      filters: [{ propertyName: 'phone', operator: 'EQ', value: phone }],
    }],
    properties: ['phone', 'firstname', 'lastname'],
    limit: 1,
  });
  return res.data?.results?.[0]?.id ?? null;
}

function splitName(full: string): { firstname: string; lastname: string } {
  const parts = full.trim().split(/\s+/);
  return {
    firstname: parts[0],
    lastname:  parts.slice(1).join(' ') || '-',
  };
}

async function upsertContact(lead: LeadInput): Promise<string | null> {
  const { firstname, lastname } = splitName(lead.name);
  const props = {
    firstname,
    lastname,
    phone:           lead.phone,
    country:         'Saudi Arabia',
    hs_language:     lead.language,
    lifecyclestage:  'lead',
    hs_lead_status:  'NEW',
    ...(lead.utmSource   ? { hs_analytics_source_data_1: lead.utmSource }   : {}),
    ...(lead.utmCampaign ? { hs_analytics_source_data_2: lead.utmCampaign } : {}),
  };

  // Try to find existing contact by phone first
  const existingId = await findContactByPhone(lead.phone);

  if (existingId) {
    await hs('PATCH', `/crm/v3/objects/contacts/${existingId}`, { properties: props });
    return existingId;
  }

  const res = await hs<HsContact>('POST', '/crm/v3/objects/contacts', { properties: props });
  return res.data?.id ?? null;
}

// ─── Deal ─────────────────────────────────────────────────────────────────────

interface HsDeal { id: string }

async function createDeal(lead: LeadInput, contactId: string): Promise<string | null> {
  const villaLabel = lead.villaTitle ?? lead.villaId ?? 'Unknown Villa';
  const dealname   = `${lead.name} — ${villaLabel} — Rafiah Villas`;

  const res = await hs<HsDeal>('POST', '/crm/v3/objects/deals', {
    properties: {
      dealname,
      pipeline:   PIPELINE,
      dealstage:  STAGE,
      deal_currency_code: 'SAR',
      ...(lead.villaId ? { description: `Villa: ${lead.villaId}` } : {}),
    },
    // Associate with contact in a single call
    associations: [{
      to: { id: contactId },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }], // deal → contact
    }],
  });

  return res.data?.id ?? null;
}

// ─── Note ─────────────────────────────────────────────────────────────────────

function buildNoteBody(lead: LeadInput): string {
  const lines: string[] = [
    '📋 New lead — Rafiah Villas',
    '─'.repeat(40),
    `Name:     ${lead.name}`,
    `Phone:    ${lead.phone} (entered: ${lead.phoneRaw})`,
    `Language: ${lead.language.toUpperCase()}`,
  ];
  if (lead.preferredContactMethod) lines.push(`Contact:  ${lead.preferredContactMethod}`);
  if (lead.interest)               lines.push(`Interest: ${lead.interest}`);
  if (lead.villaId)                lines.push(`Villa:    ${lead.villaId}${lead.villaTitle ? ' — ' + lead.villaTitle : ''}`);
  if (lead.message)                lines.push(`Message:  ${lead.message}`);
  lines.push('─'.repeat(40));
  if (lead.sourcePage)   lines.push(`Page:     ${lead.sourcePage}`);
  if (lead.utmSource)    lines.push(`UTM:      source=${lead.utmSource} medium=${lead.utmMedium ?? ''} campaign=${lead.utmCampaign ?? ''}`);
  if (lead.ref)          lines.push(`Ref:      ${lead.ref}`);
  if (lead.browser)      lines.push(`Device:   ${lead.browser} / ${lead.device ?? ''}`);
  lines.push(`Time:     ${lead.submittedAt}`);
  return lines.join('\n');
}

async function createNote(
  lead:      LeadInput,
  contactId: string,
  dealId:    string,
): Promise<void> {
  await hs('POST', '/crm/v3/objects/notes', {
    properties: {
      hs_note_body:  buildNoteBody(lead),
      hs_timestamp:  new Date(lead.submittedAt).getTime().toString(),
    },
    associations: [
      {
        to:    { id: contactId },
        types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }], // note → contact
      },
      {
        to:    { id: dealId },
        types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 214 }], // note → deal
      },
    ],
  });
}

// ─── Task (optional follow-up) ────────────────────────────────────────────────

async function createFollowUpTask(lead: LeadInput, contactId: string): Promise<void> {
  // Due 24 hours from submission
  const dueTs = new Date(lead.submittedAt).getTime() + 24 * 60 * 60 * 1000;

  await hs('POST', '/crm/v3/objects/tasks', {
    properties: {
      hs_task_subject: `Follow up: ${lead.name} (${lead.phone})`,
      hs_task_body:    `Call or WhatsApp lead from Rafiah Villas website.\nPreferred: ${lead.preferredContactMethod ?? 'whatsapp'}`,
      hs_task_status:  'NOT_STARTED',
      hs_task_type:    'TODO',
      hs_timestamp:    dueTs.toString(),
    },
    associations: [{
      to:    { id: contactId },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 204 }], // task → contact
    }],
  });
}

// ─── Public entry point ───────────────────────────────────────────────────────

export async function submitToHubSpot(lead: LeadInput): Promise<ProviderResult> {
  if (!TOKEN) {
    console.warn('[HubSpot] HUBSPOT_ACCESS_TOKEN not configured — skipping');
    return { ok: false, error: 'not configured' };
  }

  try {
    // 1. Create or update contact
    const contactId = await upsertContact(lead);
    if (!contactId) return { ok: false, error: 'contact upsert failed' };

    // 2. Create deal (associated with contact in one call)
    const dealId = await createDeal(lead, contactId);
    if (!dealId) {
      // Deal failure is non-fatal — contact was saved
      console.error('[HubSpot] deal creation failed, contact saved:', contactId);
      return { ok: true, contactId, error: 'deal creation failed' };
    }

    // 3. Note + task run in parallel — failures are non-fatal
    await Promise.allSettled([
      createNote(lead, contactId, dealId),
      createFollowUpTask(lead, contactId),
    ]);

    return { ok: true, contactId, dealId };

  } catch (err) {
    console.error('[HubSpot] unexpected error:', err);
    return { ok: false, error: 'unexpected error' };
  }
}
