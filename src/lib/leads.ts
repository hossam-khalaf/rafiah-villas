/**
 * Lead Submission Layer — Rafiah Villas
 *
 * This is the single integration point for all lead capture.
 * To connect a CRM / Google Sheets / Zapier webhook:
 *   1. Replace the TODO block in `submitLead()` with your integration.
 *   2. All metadata fields are already collected and available.
 *
 * Supported integrations (not yet wired):
 *   - Google Sheets via Apps Script Web App URL
 *   - HubSpot Forms API
 *   - Salesforce Web-to-Lead
 *   - Zapier / Make webhook
 *   - Any REST endpoint (POST JSON)
 */

export interface LeadPayload {
  // ── Core contact fields ───────────────────────────────────────
  name:  string;
  phone: string;

  // ── Metadata (auto-populated, do not ask user) ────────────────
  source:      'register_interest_section';
  locale:      'ar' | 'en';
  submittedAt: string;   // ISO 8601

  // ── Optional context (passed in when available) ───────────────
  villaId?:    string;   // e.g. "C3" if triggered from a villa card
  villaType?:  string;   // e.g. "northFacade"
  pageUrl?:    string;   // window.location.href at submission time
  userAgent?:  string;   // navigator.userAgent for device analytics
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Submit a lead to the configured backend/CRM.
 *
 * Currently logs to console in development.
 * Replace the TODO block with your real integration.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    // ── TODO: Replace this block with your integration ────────────
    //
    // Google Sheets example:
    //   await fetch(process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL!, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   });
    //
    // HubSpot example:
    //   await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ fields: [
    //       { name: 'firstname', value: payload.name },
    //       { name: 'phone', value: payload.phone },
    //     ]}),
    //   });
    //
    // ── Development: just log ─────────────────────────────────────
    console.info('[Rafiah Leads] New submission:', payload);

    // Simulate async delay
    await new Promise(r => setTimeout(r, 800));

    return { ok: true };

  } catch (err) {
    console.error('[Rafiah Leads] Submission failed:', err);
    return { ok: false, error: String(err) };
  }
}
