import { cache } from 'react';
import { PROJECT_INFO } from '@/data/project';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';

export interface SiteSettings {
  developer:                string;
  nameAr:                   string;
  nameEn:                   string;
  phone:                    string | null;
  whatsappNumber:           string | null;
  instagramUrl:             string | null;
  licenseNumber:            string | null;
  defaultSeoTitleAr:        string | null;
  defaultSeoTitleEn:        string | null;
  defaultSeoDescriptionAr:  string | null;
  defaultSeoDescriptionEn:  string | null;
  ogImageUrl:               string | null;
}

const FALLBACK: SiteSettings = {
  developer:               PROJECT_INFO.developer,
  nameAr:                  PROJECT_INFO.nameAr,
  nameEn:                  PROJECT_INFO.nameEn,
  phone:                   null,
  whatsappNumber:          null,
  instagramUrl:            null,
  licenseNumber:           null,
  defaultSeoTitleAr:       null,
  defaultSeoTitleEn:       null,
  defaultSeoDescriptionAr: null,
  defaultSeoDescriptionEn: null,
  ogImageUrl:              null,
};

// Wrapped in cache() so multiple call sites (layout, metadata, page) share one fetch per request.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const s = await client.fetch(
      siteSettingsQuery,
      {},
      { next: { tags: ['siteSettings'], revalidate: 60 } },
    );

    if (s && Object.keys(s).length > 0) {
      return {
        developer:               s.developerNameEn || PROJECT_INFO.developer,
        nameAr:                  s.projectNameAr   || PROJECT_INFO.nameAr,
        nameEn:                  s.projectNameEn   || PROJECT_INFO.nameEn,
        phone:                   s.phone                   ?? null,
        whatsappNumber:          s.whatsappNumber           ?? null,
        instagramUrl:            s.instagramUrl             ?? null,
        licenseNumber:           s.licenseNumber            ?? null,
        defaultSeoTitleAr:       s.defaultSeoTitleAr        ?? null,
        defaultSeoTitleEn:       s.defaultSeoTitleEn        ?? null,
        defaultSeoDescriptionAr: s.defaultSeoDescriptionAr  ?? null,
        defaultSeoDescriptionEn: s.defaultSeoDescriptionEn  ?? null,
        ogImageUrl:              s.ogImage
          ? urlForImage(s.ogImage).width(1200).height(630).url()
          : null,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch site settings from Sanity, falling back to static data', error);
  }

  return FALLBACK;
});
