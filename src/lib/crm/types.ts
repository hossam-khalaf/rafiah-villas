// ─── Canonical lead payload ───────────────────────────────────────────────────
// Built server-side in the API route from the raw request + UA headers.

export interface LeadInput {
  // Contact
  name:        string;
  phone:       string;       // normalized to +966XXXXXXXXX where possible
  phoneRaw:    string;       // exactly as the user typed it

  // Context (optional — populated from form props or URL params)
  preferredContactMethod?: 'whatsapp' | 'phone' | 'email';
  interest?:    string;      // e.g. "villa_inquiry", "pricing", "site_visit"
  villaId?:     string;      // e.g. "C3"
  villaTitle?:  string;      // e.g. "Corner Villa C3"
  message?:     string;      // free-text message if form has one

  // i18n
  language:    'ar' | 'en';

  // Tracking
  sourcePage?:   string;     // full URL
  utmSource?:    string;
  utmMedium?:    string;
  utmCampaign?:  string;
  ref?:          string;     // custom referrer token

  // Device (parsed from UA server-side — never from client)
  browser?:  string;
  device?:   string;

  submittedAt: string;       // ISO 8601
}

// ─── Provider results ─────────────────────────────────────────────────────────

export interface ProviderResult {
  ok:          boolean;
  contactId?:  string;
  dealId?:     string;
  error?:      string;       // safe message — no tokens, no stack traces
}

export interface LeadResult {
  success:     boolean;
  leadId?:     string;       // deal ID if available, else contact ID
  contactId?:  string;
  dealId?:     string;
  providers: {
    hubspot?: ProviderResult;
    sheets?:  ProviderResult;
    n8n?:     ProviderResult;
  };
}
