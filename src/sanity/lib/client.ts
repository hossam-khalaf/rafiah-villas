import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from './env';

/**
 * Creates a read-only Sanity client.
 * Uses CDN for public read queries to ensure fast responses.
 * Does not include write tokens or expose sensitive tokens to the client.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to bypass CDN caching for live ISR updates
});
