import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
