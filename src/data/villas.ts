import { Villa, VillaStatus, VillaType, VillaStats } from '../types/villa';

// Temporary fallback: Default unknown status to 'available'
const DEFAULT_STATUS: VillaStatus = 'available';

export const VILLAS: Villa[] = [
  // Corner Villas
  { id: 'C1', type: 'corner', status: DEFAULT_STATUS, plotSize: 373.41, price: 6200000 },
  { id: 'C11', type: 'corner', status: DEFAULT_STATUS, plotSize: 373.41, price: 6200000 },
  { id: 'D1', type: 'corner', status: DEFAULT_STATUS, plotSize: 373.41, price: 6200000 },
  { id: 'D11', type: 'corner', status: DEFAULT_STATUS, plotSize: 373.41, price: 6200000 },

  // North-facing Villas
  { id: 'C2', type: 'northFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'C3', type: 'northFacade', status: 'sold', plotSize: 300, price: 4500000 },
  { id: 'C4', type: 'northFacade', status: 'sold', plotSize: 300, price: 4500000 },
  { id: 'C5', type: 'northFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'C6', type: 'northFacade', status: 'sold', plotSize: 300, price: 4500000 },
  { id: 'C7', type: 'northFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'C8', type: 'northFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'C9', type: 'northFacade', status: 'sold', plotSize: 300, price: 4500000 },
  { id: 'C10', type: 'northFacade', status: 'reserved', plotSize: 300, price: 4500000 },

  // South-facing Villas
  { id: 'D2', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D3', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D4', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D5', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D6', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D7', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D8', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D9', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
  { id: 'D10', type: 'southFacade', status: DEFAULT_STATUS, plotSize: 300, price: 4500000 },
];

export function getVillasByStatus(status: VillaStatus): Villa[] {
  return VILLAS.filter(villa => villa.status === status);
}

export function getVillasByType(type: VillaType): Villa[] {
  return VILLAS.filter(villa => villa.type === type);
}

export function getAvailableVillas(): Villa[] {
  return getVillasByStatus('available');
}

export function sortVillasByAvailability(): Villa[] {
  // Sort order: available -> reserved -> sold
  const statusWeight: Record<VillaStatus, number> = { available: 1, reserved: 2, sold: 3 };
  return [...VILLAS].sort((a, b) => statusWeight[a.status] - statusWeight[b.status]);
}

export function getVillaStats(): VillaStats {
  return VILLAS.reduce(
    (stats, villa) => {
      stats.total++;
      stats[villa.status]++;
      return stats;
    },
    { total: 0, available: 0, reserved: 0, sold: 0 } as VillaStats
  );
}
