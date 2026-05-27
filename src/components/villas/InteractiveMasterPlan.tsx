'use client';

import { Villa, VillaType } from '@/types/villa';
import { useLocale } from 'next-intl';

interface InteractiveMasterPlanProps {
  villas: Villa[];
  selectedVillaId: string | null;
  onSelectVilla: (villaId: string, type: VillaType) => void;
  labels: {
    filters: {
      northFacade: string;
      southFacade: string;
      corner: string;
    };
    status: {
      available: string;
      sold: string;
      reserved: string;
      booked: string;
    };
  };
}

export default function InteractiveMasterPlan({
  villas,
  selectedVillaId,
  onSelectVilla,
  labels
}: InteractiveMasterPlanProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // We know the map structure:
  // Top row: C1 to C11
  // Bottom row: D1 to D11
  const topRowIds = Array.from({ length: 11 }, (_, i) => `C${i + 1}`);
  const bottomRowIds = Array.from({ length: 11 }, (_, i) => `D${i + 1}`);

  // Re-order if RTL (Arabic) so C1 / D1 start from the right
  const renderTopRow = isRtl ? [...topRowIds].reverse() : topRowIds;
  const renderBottomRow = isRtl ? [...bottomRowIds].reverse() : bottomRowIds;

  const getVillaColorClasses = (type: VillaType) => {
    switch (type) {
      case 'corner':
        return 'bg-[#012a17] border-[#d4b78f]/50 text-white'; // Royal Green
      case 'northFacade':
        return 'bg-[#d4b78f] border-[#b5913a]/30 text-[#012a17]'; // Sand Gold
      case 'southFacade':
        return 'bg-[#b5913a] border-[#012a17]/20 text-white'; // Dark Gold
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  const renderVillaBlock = (villaId: string) => {
    const villa = villas.find((v) => v.id === villaId);
    if (!villa) return <div key={villaId} className="w-full h-16 sm:h-24 bg-white/5 border border-white/10"></div>;

    const isSelected = selectedVillaId === villaId;
    const isUnavailable = villa.status !== 'available';
    const baseColors = getVillaColorClasses(villa.type);

    return (
      <button
        key={villa.id}
        onClick={() => onSelectVilla(villa.id, villa.type)}
        className={`relative w-full h-16 sm:h-24 md:h-32 flex items-center justify-center border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b78f] focus-visible:ring-offset-2 focus-visible:ring-offset-black
          ${baseColors} 
          ${isSelected ? 'ring-2 ring-white z-10 scale-[1.02] shadow-2xl' : 'hover:opacity-90 hover:scale-[1.02] hover:z-10'}
          ${isUnavailable ? 'opacity-60 saturate-50' : 'opacity-100'}
        `}
        aria-label={`Villa ${villa.id} - ${labels.status[villa.status]}`}
      >
        <span className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-wider pointer-events-none z-10">
          {villa.id}
        </span>
        
        {/* Subtle diagonal pattern for unavailable villas */}
        {isUnavailable && (
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 12px)`
          }} />
        )}
      </button>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-16 sm:mb-24 flex flex-col items-center">
      {/* Map Container */}
      <div className="w-full overflow-x-auto pb-8 scrollbar-hide">
        <div className="min-w-[768px] grid grid-cols-11 gap-[2px] p-[2px] bg-white/10 rounded-sm">
          {/* Top Row */}
          {renderTopRow.map(renderVillaBlock)}
          
          {/* Bottom Row */}
          {renderBottomRow.map(renderVillaBlock)}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/80">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-[#012a17] border border-[#d4b78f]/50 block"></span>
          <span>{labels.filters.corner}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-[#d4b78f] border border-[#b5913a]/30 block"></span>
          <span>{labels.filters.northFacade}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-[#b5913a] border border-[#012a17]/20 block"></span>
          <span>{labels.filters.southFacade}</span>
        </div>
      </div>
    </div>
  );
}
