export type VillaStatus = 'available' | 'reserved' | 'booked' | 'sold';
export type VillaType = 'corner' | 'northFacade' | 'southFacade';

export interface Villa {
  id: string; // e.g. C1, C2, D1
  status: VillaStatus;
  type: VillaType;
  plotSize?: number; // Area in m2
  bua?: number; // Built Up Area
  price?: number; // Price in SAR
  // Future Sanity fields to be wired later:
  // imageGallery?: string[];
  // floorPlanRef?: string;
}

export interface VillaStats {
  total: number;
  available: number;
  reserved: number;
  booked: number;
  sold: number;
}
