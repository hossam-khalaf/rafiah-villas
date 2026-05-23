import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { processLead }        from '@/lib/crm/index';
import { normalizeSaudiPhone } from '@/lib/crm/hubspot';
import { parseBrowser, parseDevice, sanitize } from '@/lib/utils';
import type { LeadInput }     from '@/lib/crm/types';

// ─── Request schema ───────────────────────────────────────────────────────────

const RequestSchema = z.object({
  // Required
  name:  z.string().min(2).max(100),
  phone: z.string().min(5).max(30),

  // Optional context
  preferredContactMethod: z.enum(['whatsapp', 'phone', 'email']).optional(),
  interest:    z.string().max(100).optional(),
  villaId:     z.string().max(50).optional(),
  villaTitle:  z.string().max(200).optional(),
  message:     z.string().max(1000).optional(),

  // i18n — default Arabic
  language: z.enum(['ar', 'en']).default('ar'),

  // Tracking (collected client-side, validated server-side)
  sourcePage:   z.string().max(1000).optional(),
  utmSource:    z.string().max(200).optional(),
  utmMedium:    z.string().max(200).optional(),
  utmCampaign:  z.string().max(200).optional(),
  ref:          z.string().max(200).optional(),

  // Anti-bot honeypot — must be absent or empty
  _hp: z.string().max(0).optional(),
});

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Parse body
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'invalid JSON' }, { status: 400 });
  }

  // 2. Validate
  const parsed = RequestSchema.safeParse(raw);
  if (!parsed.success) {
    const field = parsed.error.issues[0];
    return NextResponse.json(
      { success: false, error: `${field?.path.join('.') ?? 'field'}: ${field?.message ?? 'invalid'}` },
      { status: 422 },
    );
  }

  const body = parsed.data;

  // 3. Honeypot — silently accept but don't process
  if (body._hp && body._hp.length > 0) {
    return NextResponse.json({ success: true, leadId: 'hp' });
  }

  // 4. Parse UA from request headers (server-side only — never from client)
  const ua      = req.headers.get('user-agent') ?? '';
  const browser = parseBrowser(ua);
  const device  = parseDevice(ua);

  // 5. Build canonical LeadInput
  const phoneRaw = sanitize(body.phone);
  const phone    = normalizeSaudiPhone(phoneRaw);

  const lead: LeadInput = {
    name:                   sanitize(body.name),
    phone,
    phoneRaw,
    preferredContactMethod: body.preferredContactMethod,
    interest:               body.interest,
    villaId:                body.villaId,
    villaTitle:             body.villaTitle,
    message:                body.message ? sanitize(body.message) : undefined,
    language:               body.language,
    sourcePage:             body.sourcePage,
    utmSource:              body.utmSource,
    utmMedium:              body.utmMedium,
    utmCampaign:            body.utmCampaign,
    ref:                    body.ref,
    browser,
    device,
    submittedAt:            new Date().toISOString(),
  };

  // 6. Fan out to all CRM providers
  const result = await processLead(lead);

  // 7. Return clean response — never expose internal details
  return NextResponse.json({
    success:   result.success,
    leadId:    result.leadId,
    contactId: result.contactId,
    dealId:    result.dealId,
  });
}
