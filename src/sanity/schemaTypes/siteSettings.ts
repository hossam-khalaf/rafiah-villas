import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'projectNameAr',
      title: 'Project Name (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'projectNameEn',
      title: 'Project Name (English)',
      type: 'string',
    }),
    defineField({
      name: 'developerNameAr',
      title: 'Developer Name (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'developerNameEn',
      title: 'Developer Name (English)',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'licenseNumber',
      title: 'License Number',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeoTitleAr',
      title: 'Default SEO Title (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeoTitleEn',
      title: 'Default SEO Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeoDescriptionAr',
      title: 'Default SEO Description (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'defaultSeoDescriptionEn',
      title: 'Default SEO Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
  ],
});
