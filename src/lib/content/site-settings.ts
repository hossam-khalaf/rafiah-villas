import { PROJECT_INFO } from '@/data/project';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';

export async function getSiteSettings() {
  try {
    const settings = await client.fetch(siteSettingsQuery);
    if (settings && Object.keys(settings).length > 0) {
      return {
        developer: settings.developerNameEn || PROJECT_INFO.developer,
        nameAr: settings.projectNameAr || PROJECT_INFO.nameAr,
        nameEn: settings.projectNameEn || PROJECT_INFO.nameEn,
        phone: settings.phone,
        whatsappNumber: settings.whatsappNumber,
        instagramUrl: settings.instagramUrl,
        licenseNumber: settings.licenseNumber,
        defaultSeoTitleAr: settings.defaultSeoTitleAr,
        defaultSeoTitleEn: settings.defaultSeoTitleEn,
        defaultSeoDescriptionAr: settings.defaultSeoDescriptionAr,
        defaultSeoDescriptionEn: settings.defaultSeoDescriptionEn,
        ogImage: settings.ogImage,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch site settings from Sanity, falling back to static data', error);
  }
  
  return {
    developer: PROJECT_INFO.developer,
    nameAr: PROJECT_INFO.nameAr,
    nameEn: PROJECT_INFO.nameEn,
    phone: null,
    whatsappNumber: null,
    instagramUrl: null,
    licenseNumber: null,
    defaultSeoTitleAr: null,
    defaultSeoTitleEn: null,
    defaultSeoDescriptionAr: null,
    defaultSeoDescriptionEn: null,
    ogImage: null,
  };
}
