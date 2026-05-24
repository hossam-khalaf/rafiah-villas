import type { LeadInput, ProviderResult } from './types';
import { saudiNow } from '@/lib/utils';

const WEBHOOK_URL  = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SHEETS_TOKEN = process.env.GOOGLE_SHEETS_TOKEN;

if (!SHEETS_TOKEN) {
  console.warn('[Sheets] GOOGLE_SHEETS_TOKEN not configured — skipping');
}

export async function submitToSheets(lead: LeadInput): Promise<ProviderResult> {
  if (!WEBHOOK_URL) {
    console.warn('[Sheets] GOOGLE_SHEETS_WEBHOOK_URL not configured — skipping');
    return { ok: false, error: 'not configured' };
  }

  if (!SHEETS_TOKEN) {
    console.warn('[Sheets] GOOGLE_SHEETS_TOKEN not configured — skipping');
    return { ok: false, error: 'token not configured' };
  }

  const { date, time } = saudiNow();

  const row = {
    _token:  SHEETS_TOKEN,
    name:    lead.name,
    phone:   lead.phoneRaw,
    url:     lead.sourcePage ?? '',
    date,
    browser: lead.browser ?? '',
    device:  lead.device  ?? '',
    time,
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(row),
    });

    if (!res.ok) {
      console.error('[Sheets] Apps Script returned', res.status);
    }
    return { ok: true };

  } catch (err) {
    console.error('[Sheets] fetch failed:', err);
    return { ok: true };
  }
}
