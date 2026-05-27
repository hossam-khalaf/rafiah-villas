'use client';

import { Villa, VillaType, VillaStatus, STATUS_WEIGHT } from '@/types/villa';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from 'next-intl';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SpotlightButton from '@/components/ui/SpotlightButton';

interface VillasGridProps {
  villas: Villa[];
  activeTab: VillaType;
  onTabChange: (tab: VillaType) => void;
  selectedVillaId?: string | null;
  labels: {
    filters: {
      northFacade: string;
      southFacade: string;
      corner: string;
    };
    card: {
      villa: string;
      currency: string;
      registerInterest: string;
    };
    status: {
      available: string;
      sold: string;
      reserved: string;
      booked: string;
    }
  };
}

export default function VillasGrid({ villas, labels, activeTab, onTabChange, selectedVillaId }: VillasGridProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const arrowIcon = isRtl ? '←' : '→';
  const areaSymbol = isRtl ? 'م' : 'm';

  const filteredVillas = villas
    .filter(v => v.type === activeTab)
    .sort((a, b) => STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status]);

  // Status Colors Mapping
  const statusConfig: Record<VillaStatus, { bg: string, text: string, border: string }> = {
    available: { bg: 'bg-emerald-500/10', text: 'text-emerald-400',  border: 'border-emerald-500/30' },
    reserved:  { bg: 'bg-brand-gold/10',  text: 'text-brand-gold',   border: 'border-brand-gold/30' },
    booked:    { bg: 'bg-brand-gold/10',  text: 'text-brand-gold',   border: 'border-brand-gold/30' },
    sold:      { bg: 'bg-red-500/5',      text: 'text-red-400/70',   border: 'border-red-500/20' },
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap gap-0 border border-white/15 max-w-fit mb-12 sm:mb-16 sticky top-0 sm:top-24 z-30 bg-brand-royal-green shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
        {(['northFacade', 'southFacade', 'corner'] as VillaType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === tab 
                ? 'bg-brand-gold text-black' 
                : 'bg-transparent text-white/75 hover:text-white hover:bg-white/5 border-s border-white/10 first:border-s-0'
            }`}
          >
            {labels.filters[tab]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[600px]">
        <AnimatePresence mode="popLayout">
          {filteredVillas.map((villa, index) => {
            const isSelected = selectedVillaId === villa.id;
            return (
            <motion.div
              key={villa.id}
              id={`villa-card-${villa.id}`}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true, amount: 0.2 }}
              className={`transition-all duration-700 ${isSelected ? 'ring-2 ring-[#d4b78f] ring-offset-4 ring-offset-[#012a17] scale-[1.02] z-20' : 'z-10'}`}
            >
            <SpotlightCard
              className={`group relative bg-white/[0.03] border p-6 sm:p-8 hover:bg-white/[0.06] transition-all duration-500 flex flex-col min-h-[300px] ${isSelected ? 'border-[#d4b78f]' : 'border-white/10 hover:border-brand-gold/50'}`}
            >
              {/* Top Row: Title & Badge */}
              <div className="flex justify-between items-start mb-8 z-10 relative">
                <p className="text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
                  {labels.card.villa} {villa.id} <span className="mx-2 opacity-50">•</span> {labels.filters[villa.type]}
                </p>
                
                <div className={`px-3 py-1 text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest border absolute top-0 end-0 -mt-2 -me-2 shadow-lg bg-black/40 ${statusConfig[villa.status].text} ${statusConfig[villa.status].border}`}>
                  {labels.status[villa.status]}
                </div>
              </div>

              {/* Area — Main Stat */}
              <div className="mb-10 z-10 relative">
                <p className="font-serif text-4xl sm:text-5xl text-white tracking-tight">
                  {villa.plotSize || 'TBD'}{' '}
                  <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/70 ms-2">
                    {areaSymbol}²
                  </span>
                </p>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-white/5 mb-8 z-10 relative group-hover:bg-white/15 transition-colors"></div>

              {/* Bottom Row: Price & Action */}
              <div className="flex justify-between items-center mt-auto z-10 relative">
                <div className="flex items-center gap-3 text-white/90 group-hover:text-white transition-colors">
                {villa.status === 'available' ? (
                    <span className="font-mono text-sm sm:text-base tracking-wide">
                      {villa.price ? villa.price.toLocaleString() : 'TBD'}{' '}
                      <span className="text-[0.6rem] uppercase tracking-widest text-white/75 ms-1">{labels.card.currency}</span>
                    </span>
                  ) : (
                    <span className="font-sans text-sm font-medium text-white/50 tracking-widest uppercase select-none">
                      — —
                    </span>
                  )}
                </div>
                
                {/* Button CTA */}
                <SpotlightButton spotlightColor="oklch(78% 0.12 75 / 0.25)">
                  <a
                    href="#register-interest"
                    className="bg-brand-gold text-brand-black px-4 sm:px-5 py-2.5 text-[0.65rem] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-brand-royal-green flex items-center gap-2 border border-brand-gold/20"
                  >
                    {labels.card.registerInterest} <span className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">{arrowIcon}</span>
                  </a>
                </SpotlightButton>
              </div>

            </SpotlightCard>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
