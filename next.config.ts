import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.sanity.io https://*.google-analytics.com https://*.googletagmanager.com",
  "connect-src 'self' https://*.sanity.io https://*.google-analytics.com https://*.googletagmanager.com",
  "frame-src 'self' https://*.sanity.io",
  "font-src 'self' data:",
  "media-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  // Prevent this site from being embedded in iframes on other domains
  { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
  // Prevent browsers from MIME-sniffing the content type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Only send the origin when navigating to a different site
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  // Disable access to camera, mic, geolocation — not needed on this site
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
  // Enable XSS filter in older browsers
  { key: 'X-XSS-Protection',       value: '1; mode=block' },
  // Content-Security-Policy — primary XSS defense
  { key: 'Content-Security-Policy', value: csp },
  // Enforce HTTPS
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes except Sanity Studio (it manages its own iframe rules)
        source: '/((?!studio).*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
