import type { StructureResolver } from 'sanity/structure';

// Document types that should behave as singletons (one fixed document, no list)
const SINGLETONS = ['siteSettings'];

/**
 * Studio desk structure.
 * - "Site Settings" is a singleton — a single fixed document, opened directly.
 * - All other document types render as normal lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? ''),
      ),
    ]);
