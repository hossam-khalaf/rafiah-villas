import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dfvpizyg').replace(/[^a-zA-Z0-9-]/g, '');
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').replace(/[^a-zA-Z0-9-]/g, '');

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
