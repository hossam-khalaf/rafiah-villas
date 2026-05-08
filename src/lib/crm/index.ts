import type { LeadInput, LeadResult } from './types';
import { submitToHubSpot }  from './hubspot';
import { submitToSheets }   from './sheets';
import { submitToN8n }      from './n8n';

// ─── Orchestrator ─────────────────────────────────────────────────────────────
// Fans the lead out to every configured provider in parallel.
// A failing provider never blocks success — we always return ok: true
// as long as the payload was valid, so the user is never left stuck.

export async function processLead(lead: LeadInput): Promise<LeadResult> {
  console.info('[CRM] processing lead:', lead.name, lead.phone, `[${lead.language}]`);

  // All three providers run concurrently
  const [hubspot, sheets, n8n] = await Promise.allSettled([
    submitToHubSpot(lead),
    submitToSheets(lead),
    submitToN8n(lead),
  ]);

  const hsResult     = hubspot.status === 'fulfilled' ? hubspot.value : { ok: false as const, error: 'provider threw' };
  const sheetsResult = sheets.status  === 'fulfilled' ? sheets.value  : { ok: false as const, error: 'provider threw' };
  const n8nResult    = n8n.status     === 'fulfilled' ? n8n.value     : { ok: false as const, error: 'provider threw' };

  const contactId = hsResult.contactId;
  const dealId    = hsResult.dealId;
  const leadId    = dealId ?? contactId;

  return {
    success:   true,      // always true for valid payloads
    leadId,
    contactId,
    dealId,
    providers: {
      hubspot: hsResult,
      sheets:  sheetsResult,
      n8n:     n8nResult,
    },
  };
}
