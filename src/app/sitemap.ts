import { MetadataRoute } from 'next';

const baseUrl = 'https://rafiah-villas.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/privacy', '/terms'];

  return routes.map((route) => ({
    url: `${baseUrl}/ar${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.5,
    alternates: {
      languages: {
        ar: `${baseUrl}/ar${route}`,
        en: `${baseUrl}/en${route}`,
      },
    },
  }));
}
