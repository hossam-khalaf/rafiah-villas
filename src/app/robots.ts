import { MetadataRoute } from 'next';

const baseUrl = 'https://rafiah-villas.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
