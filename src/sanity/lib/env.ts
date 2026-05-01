/**
 * Safely reads environment variables for Sanity.
 * It will not crash during local development if these are missing,
 * providing safe fallbacks to prevent build/dev errors.
 * 
 * Required env vars:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID: The Sanity project ID.
 * - NEXT_PUBLIC_SANITY_DATASET: The Sanity dataset (usually 'production').
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

// Server-only read token (never exposed to client components)
export const readToken = process.env.SANITY_API_READ_TOKEN;
