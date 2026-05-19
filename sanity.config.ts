import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

const projectId = 'dfvpizyg';
const dataset = 'production';

// Singleton document types — only one instance allowed, no create/delete
const SINGLETONS = ['siteSettings'];

export default defineConfig({
  name: 'rafiah-villas',
  title: 'Rafiah Villas',
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Hide singletons from the global "create new" menu
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !SINGLETONS.includes(item.templateId))
        : prev,
    // Remove delete/duplicate actions for singletons
    actions: (prev, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action ?? ''),
          )
        : prev,
  },
  basePath: '/studio', // Overridden in page.tsx for locale support
});
