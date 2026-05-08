import type { LeadInput, ProviderResult } from './types';

// ─── Config ───────────────────────────────────────────────────────────────────
// Set N8N_LEAD_WEBHOOK_URL to your n8n "Webhook" node's production URL.
// The full LeadInput payload is forwarded as JSON — map it however you need
// inside your n8n workflow.

const WEBHOOK_URL = process.env.N8N_LEAD_WEBHOOK_URL;

// ─── Provider ─────────────────────────────────────────────────────────────────

export async function submitToN8n(lead: LeadInput): Promise<ProviderResult> {
  if (!WEBHOOK_URL) {
    console.warn('[n8n] N8N_LEAD_WEBHOOK_URL not configured — skipping');
    return { ok: false, error: 'not configured' };
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(lead),
    });

    if (!res.ok) {
      console.error('[n8n] webhook returned', res.status);
      return { ok: false, error: `n8n ${res.status}` };
    }

    return { ok: true };

  } catch (err) {
    console.error('[n8n] fetch failed:', err);
    return { ok: false, error: 'network error' };
  }
}
