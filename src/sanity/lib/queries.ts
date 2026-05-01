import { groq } from 'next-sanity';

// Query all villas, ordered by displayOrder or fallback to createdAt
export const allVillasQuery = groq`
  *[_type == "villa"] | order(displayOrder asc, _createdAt desc) {
    _id,
    villaCode,
    "slug": slug.current,
    type,
    status,
    area,
    price,
    isFeatured,
    titleAr,
    titleEn,
    shortDescriptionAr,
    shortDescriptionEn,
    gallery,
    floorPlanImages
  }
`;

// Query available villas only
export const availableVillasQuery = groq`
  *[_type == "villa" && status == "available"] | order(displayOrder asc, _createdAt desc) {
    _id,
    villaCode,
    "slug": slug.current,
    type,
    status,
    area,
    price,
    isFeatured,
    titleAr,
    titleEn,
    shortDescriptionAr,
    shortDescriptionEn,
    gallery,
    floorPlanImages
  }
`;

// Query featured villas only
export const featuredVillasQuery = groq`
  *[_type == "villa" && isFeatured == true] | order(displayOrder asc, _createdAt desc) {
    _id,
    villaCode,
    "slug": slug.current,
    type,
    status,
    area,
    price,
    isFeatured,
    titleAr,
    titleEn,
    shortDescriptionAr,
    shortDescriptionEn,
    gallery,
    floorPlanImages
  }
`;

// Query site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    projectNameAr,
    projectNameEn,
    developerNameAr,
    developerNameEn,
    phone,
    whatsappNumber,
    instagramUrl,
    licenseNumber,
    defaultSeoTitleAr,
    defaultSeoTitleEn,
    defaultSeoDescriptionAr,
    defaultSeoDescriptionEn,
    ogImage
  }
`;
