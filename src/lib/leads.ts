'use server';

export interface LeadPayload {
  name:        string;
  phone:       string;
  source:      'register_interest_section';
  locale:      'ar' | 'en';
  submittedAt: string;
  villaId?:    string;
  villaType?:  string;
  pageUrl?:    string;
  userAgent?:  string;
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

// ── UA helpers ────────────────────────────────────────────────────────────────

function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua))                             return 'Edge';
  if (/Chrome\//.test(ua) && /Safari\//.test(ua))   return 'Chrome';
  if (/Firefox\//.test(ua))                         return 'Firefox';
  if (/Safari\//.test(ua))                          return 'Safari';
  return 'Other';
}

function parseDevice(ua: string): string {
  if (/iPhone/.test(ua))              return 'iPhone';
  if (/iPad/.test(ua))                return 'iPad';
  if (/Android/.test(ua))             return 'Android';
  if (/Windows/.test(ua))             return 'Windows';
  if (/Macintosh|Mac OS X/.test(ua))  return 'Apple';
  return 'Other';
}

// Saudi Arabia is UTC+3
function saudiNow() {
  const now = new Date();
  const saudi = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = `${pad(saudi.getDate())}/${pad(saudi.getMonth() + 1)}/${saudi.getFullYear()}`;
  const time = `${pad(saudi.getHours())}:${pad(saudi.getMinutes())}:${pad(saudi.getSeconds())}`;
  return { date, time };
}

// ── Main ──────────────────────────────────────────────────────────────────────

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const ua = payload.userAgent ?? '';
  const { date, time } = saudiNow();

  const row = {
    name:    payload.name,
    phone:   payload.phone,
    url:     payload.pageUrl ?? '',
    date,
    browser: parseBrowser(ua),
    device:  parseDevice(ua),
    time,
  };

  // ── Google Sheets via Apps Script Web App ─────────────────────────────────
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(row),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('[Rafiah Leads] Sheets error:', res.status, text);
        return { ok: false, error: 'Sheets request failed' };
      }

      return { ok: true };

    } catch (err) {
      console.error('[Rafiah Leads] Fetch error:', err);
      return { ok: false, error: String(err) };
    }
  }

  // ── Dev fallback (no webhook configured) ─────────────────────────────────
  console.info('[Rafiah Leads] No GOOGLE_SHEETS_WEBHOOK_URL set — row would be:', row);
  await new Promise(r => setTimeout(r, 600));
  return { ok: true };
}
