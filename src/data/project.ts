import { VillaStatus, VillaType } from '../types/villa';

export const PROJECT_LABELS = {
  ar: {
    status: {
      available: 'متاحة',
      reserved: 'محجوزة',
      sold: 'مباعة'
    } as Record<VillaStatus, string>,
    types: {
      corner: 'فلل الزاوية',
      northFacade: 'فلل الواجهة الشمالية',
      southFacade: 'فلل الواجهة الجنوبية'
    } as Record<VillaType, string>
  },
  en: {
    status: {
      available: 'Available',
      reserved: 'Reserved',
      sold: 'Sold'
    } as Record<VillaStatus, string>,
    types: {
      corner: 'Corner Villas',
      northFacade: 'North-Facing Villas',
      southFacade: 'South-Facing Villas'
    } as Record<VillaType, string>
  }
};

export const PROJECT_INFO = {
  developer: "Kira Estates",
  nameAr: "رفيعة",
  nameEn: "Rafiah",
};
