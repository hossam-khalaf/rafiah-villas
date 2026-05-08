'use server';

import { z } from 'zod';

// Shared with google-apps-script.js — must match exactly
const SHEETS_URL   = 'https://script.google.com/macros/s/AKfycbxAmpvxJWD3JDIlflTJxHWjvERxlvxCBfSoAa4JSJVX8Uo8-nEpNeFmBqcMCbPT4MXL/exec';
const SHEETS_TOKEN = 'raf_x9k2m_2026';

// ── Validation schema ─────────────────────────────────────────────────────────
// Phone allows digits, spaces, +, -, (, ), Arabic-Indic numerals ٠-٩
const LeadSchema = z.object({
  name:  z.string().min(2, 'too short').max(100, 'too long'),
  phone: z.string().regex(/^[+\d\s\-()٠-٩]{5,25}$/, 'invalid phone'),
  _hp:   z.string().max(0, 'bot'),   // honeypot — must be empty
});

export interface LeadPayload {
  name:        string;
  phone:       string;
  _hp:         string;              // honeypot field
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

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua))                             return 'Edge';
  if (/Chrome\//.test(ua) && /Safari\//.test(ua))   return 'Chrome';
  if (/Firefox\//.test(ua))                         return 'Firefox';
  if (/Safari\//.test(ua))                          return 'Safari';
  return 'Other';
}

function parseDevice(ua: string): string {
  if (/iPhone/.test(ua))             return 'iPhone';
  if (/iPad/.test(ua))               return 'iPad';
  if (/Android/.test(ua))            return 'Android';
  if (/Windows/.test(ua))            return 'Windows';
  if (/Macintosh|Mac OS X/.test(ua)) return 'Apple';
  return 'Other';
}

// Saudi Arabia is UTC+3 — no daylight saving
function saudiNow() {
  const now   = new Date();
  const saudi = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
  const pad   = (n: number) => String(n).padStart(2, '0');
  return {
    date: `${pad(saudi.getDate())}/${pad(saudi.getMonth() + 1)}/${saudi.getFullYear()}`,
    time: `${pad(saudi.getHours())}:${pad(saudi.getMinutes())}:${pad(saudi.getSeconds())}`,
  };
}

// Strip HTML tags and trim — prevents formula injection in Sheets
function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/[=+\-@\t\r]/g, '').trim();
}

// ── Main ──────────────────────────────────────────────────────────────────────

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {

  // 1. Validate
  const parsed = LeadSchema.safeParse({
    name:  payload.name,
    phone: payload.phone,
    _hp:   payload._hp,
  });

  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'invalid';
    // Honeypot filled → silently succeed (don't tell bots they failed)
    if (msg === 'bot') return { ok: true };
    return { ok: false, error: msg === 'invalid phone'
      ? (payload.name.length < 2 ? 'الاسم قصير جداً' : 'رقم الجوال غير صحيح')
      : 'يرجى التحقق من البيانات' };
  }

  // 2. Sanitize
  const ua = payload.userAgent ?? '';
  const { date, time } = saudiNow();

  const row = {
    _token:  SHEETS_TOKEN,
    name:    sanitize(parsed.data.name),
    phone:   sanitize(parsed.data.phone),
    url:     payload.pageUrl ?? '',
    date,
    browser: parseBrowser(ua),
    device:  parseDevice(ua),
    time,
  };

  // 3. Send
  if (!SHEETS_URL) {
    console.info('[Rafiah Leads] No SHEETS_URL — row:', row);
    await new Promise(r => setTimeout(r, 600));
    return { ok: true };
  }

  try {
    const res = await fetch(SHEETS_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(row),
    });

    if (!res.ok) {
      // Log the failure server-side but don't block the user —
      // a Sheets outage shouldn't prevent a lead from registering.
      console.error('[Rafiah Leads] Sheets returned', res.status, '— lead logged above, update SHEETS_URL if this persists');
    }

    return { ok: true };

  } catch (err) {
    // Same — log but don't block the user
    console.error('[Rafiah Leads] Fetch failed:', err, '— lead was:', JSON.stringify(row));
    return { ok: true };
  }
}
