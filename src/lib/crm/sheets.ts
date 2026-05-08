import type { LeadInput, ProviderResult } from './types';

// ─── Config ───────────────────────────────────────────────────────────────────
// Apps Script Web App URL — set GOOGLE_SHEETS_WEBHOOK_URL in your environment.
// The script at /scripts/google-apps-script.js must be deployed as a Web App
// (Execute as: Me, Who can access: Anyone) and must match SHEETS_TOKEN.

const WEBHOOK_URL  = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SHEETS_TOKEN = 'raf_x9k2m_2026'; // must match EXPECTED_TOKEN in the Apps Script

// ─── Helpers ──────────────────────────────────────────────────────────────────

function saudiNow(): { date: string; time: string } {
  const now   = new Date();
  const saudi = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
  const pad   = (n: number) => String(n).padStart(2, '0');
  return {
    date: `${pad(saudi.getDate())}/${pad(saudi.getMonth() + 1)}/${saudi.getFullYear()}`,
    time: `${pad(saudi.getHours())}:${pad(saudi.getMinutes())}:${pad(saudi.getSeconds())}`,
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export async function submitToSheets(lead: LeadInput): Promise<ProviderResult> {
  if (!WEBHOOK_URL) {
    console.warn('[Sheets] GOOGLE_SHEETS_WEBHOOK_URL not configured — skipping');
    return { ok: false, error: 'not configured' };
  }

  const { date, time } = saudiNow();

  const row = {
    _token:  SHEETS_TOKEN,
    name:    lead.name,
    phone:   lead.phoneRaw,          // use raw phone in the sheet (readable)
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
    // Always treat as ok — Sheets is a backup, not a blocker
    return { ok: true };

  } catch (err) {
    console.error('[Sheets] fetch failed:', err);
    return { ok: true }; // non-fatal
  }
}
