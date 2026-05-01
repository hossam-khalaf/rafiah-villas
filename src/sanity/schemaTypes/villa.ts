import { defineType, defineField } from 'sanity';

export const villaType = defineType({
  name: 'villa',
  title: 'Villa',
  type: 'document',
  fields: [
    defineField({
      name: 'villaCode',
      title: 'Villa Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'villaCode',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Corner', value: 'corner' },
          { title: 'North Facade', value: 'northFacade' },
          { title: 'South Facade', value: 'southFacade' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
      },
    }),
    defineField({
      name: 'area',
      title: 'Area (m2)',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Price (SAR)',
      type: 'number',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
    }),
    defineField({
      name: 'titleAr',
      title: 'Title (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'shortDescriptionAr',
      title: 'Short Description (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'shortDescriptionEn',
      title: 'Short Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'floorPlanImages',
      title: 'Floor Plan Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'villaCode',
      subtitle: 'status',
    },
  },
});
