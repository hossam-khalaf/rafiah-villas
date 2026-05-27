export function GET() {
  const content = `User-Agent: *
Allow: /
Disallow: /api/
Disallow: /studio/

Sitemap: https://rafiah-villas.vercel.app/sitemap.xml

Content-Signal: ai-train=no, search=yes, ai-input=no
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
