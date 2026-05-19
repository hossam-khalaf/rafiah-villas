import { VILLAS, getAvailableVillas, getVillaStats } from '@/data/villas';
import { client } from '@/sanity/lib/client';
import { 
  allVillasQuery, 
  availableVillasQuery, 
  featuredVillasQuery 
} from '@/sanity/lib/queries';
import type { Villa, VillaStats, VillaType, VillaStatus } from '@/types/villa';

interface SanityVillaRaw {
  villaCode?: string;
  type?: VillaType;
  status?: VillaStatus;
  area?: number;
  price?: number;
}

/** Sort weight: available first, booked/sold last */
const STATUS_WEIGHT: Record<VillaStatus, number> = {
  available: 1,
  reserved: 2,
  booked: 3,
  sold: 4,
};

function sortByAvailability(villas: Villa[]): Villa[] {
  return [...villas].sort((a, b) => STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status]);
}

// Helper to map Sanity document back to our core Villa type
function mapSanityVilla(sanityDoc: SanityVillaRaw): Villa {
  return {
    id: sanityDoc.villaCode || '',
    type: sanityDoc.type ?? 'corner',
    status: sanityDoc.status ?? 'available',
    plotSize: sanityDoc.area,
    price: sanityDoc.price,
    // Future optional fields can be safely mapped here
  };
}

export async function getAllVillas(): Promise<Villa[]> {
  try {
    const sanityVillas = await client.fetch(allVillasQuery, {}, { next: { tags: ['villa'] } });
    if (sanityVillas && sanityVillas.length > 0) {
      return sortByAvailability(sanityVillas.map(mapSanityVilla));
    }
  } catch (error) {
    console.warn('Failed to fetch villas from Sanity, falling back to static data', error);
  }
  return sortByAvailability(VILLAS);
}

export async function getAvailableVillasContent(): Promise<Villa[]> {
  try {
    const sanityVillas = await client.fetch(availableVillasQuery, {}, { next: { tags: ['villa'] } });
    if (sanityVillas && sanityVillas.length > 0) {
      return sanityVillas.map(mapSanityVilla);
    }
  } catch (error) {
    console.warn('Failed to fetch available villas from Sanity, falling back to static data', error);
  }
  return getAvailableVillas();
}

export async function getFeaturedVillasContent(): Promise<Villa[]> {
  try {
    const sanityVillas = await client.fetch(featuredVillasQuery, {}, { next: { tags: ['villa'] } });
    if (sanityVillas && sanityVillas.length > 0) {
      return sanityVillas.map(mapSanityVilla);
    }
  } catch (error) {
    console.warn('Failed to fetch featured villas from Sanity, falling back to static data', error);
  }
  return []; // Fallback to empty if no static featured logic exists
}

export async function getVillaStatsContent(): Promise<VillaStats> {
  try {
    const sanityVillas: SanityVillaRaw[] = await client.fetch(allVillasQuery, {}, { next: { tags: ['villa'] } });
    if (sanityVillas && sanityVillas.length > 0) {
      const stats = { total: 0, available: 0, reserved: 0, booked: 0, sold: 0 } as VillaStats;
      sanityVillas.forEach((v) => {
        stats.total++;
        if (v.status === 'available') stats.available++;
        if (v.status === 'reserved') stats.reserved++;
        if (v.status === 'booked') stats.booked++;
        if (v.status === 'sold') stats.sold++;
      });
      return stats;
    }
  } catch (error) {
    console.warn('Failed to fetch villa stats from Sanity, falling back to static data', error);
  }
  return getVillaStats();
}
