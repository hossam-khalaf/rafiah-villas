import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = 'dfvpizyg';
const dataset = 'production';

export default defineConfig({
  name: 'rafiah-villas',
  title: 'Rafiah Villas',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio', // Overridden in page.tsx for locale support
});
