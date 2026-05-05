'use client';

import { useState } from 'react';
import { Villa, VillaType, VillaStatus } from '@/types/villa';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from 'next-intl';

interface VillasGridProps {
  villas: Villa[];
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
    }
  };
}

export default function VillasGrid({ villas, labels }: VillasGridProps) {
  const [activeTab, setActiveTab] = useState<VillaType>('northFacade');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const arrowIcon = isRtl ? '←' : '→';
  const areaSymbol = isRtl ? 'م' : 'm';

  const filteredVillas = villas.filter(v => v.type === activeTab);

  // Status Colors Mapping
  const statusConfig: Record<VillaStatus, { bg: string, text: string, border: string }> = {
    available: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    sold: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
    reserved: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap gap-0 border border-white/10 max-w-fit mb-12 sm:mb-16 sticky top-0 sm:top-24 z-30 backdrop-blur-md bg-[#181816]/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        {(['northFacade', 'southFacade', 'corner'] as VillaType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === tab 
                ? 'bg-[#D4B78F] text-black' 
                : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5 border-s border-white/10 first:border-s-0'
            }`}
          >
            {labels.filters[tab]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[600px]">
        <AnimatePresence mode="popLayout">
          {filteredVillas.map((villa, index) => (
            <motion.div
              key={villa.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3 } }}
              className="group relative bg-[#2e2d2b] border border-white/10 p-6 sm:p-8 hover:border-[#D4B78F]/40 transition-all duration-500 flex flex-col min-h-[300px] overflow-hidden cursor-pointer"
            >
              {/* Top Row: Title & Badge */}
              <div className="flex justify-between items-start mb-8 z-10 relative">
                <p className="text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
                  {labels.card.villa} {villa.id} <span className="mx-2 opacity-50">•</span> {labels.filters[villa.type]}
                </p>
                
                <div className={`px-3 py-1 text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest border absolute top-0 end-0 -mt-2 -me-2 shadow-lg backdrop-blur-sm ${statusConfig[villa.status].bg} ${statusConfig[villa.status].text} ${statusConfig[villa.status].border}`}>
                  {labels.status[villa.status]}
                </div>
              </div>

              {/* Price */}
              <div className="mb-10 z-10 relative">
                <p className="font-serif text-4xl sm:text-5xl text-white tracking-tight">
                  {villa.price ? villa.price.toLocaleString() : 'TBD'} <span className="font-sans text-xs sm:text-sm font-bold tracking-widest uppercase text-white/70 ml-2">{labels.card.currency}</span>
                </p>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-white/5 mb-8 z-10 relative group-hover:bg-white/15 transition-colors"></div>

              {/* Bottom Row: Area & Hover Action */}
              <div className="flex justify-between items-center mt-auto z-10 relative">
                <div className="flex items-center gap-3 text-white/90 group-hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M3 21V3l18 18"/>
                  </svg>
                  <span className="font-mono text-sm">
                    {villa.plotSize || 'TBD'} <span className="text-[0.6rem] uppercase tracking-widest">{areaSymbol}<sup>2</sup></span>
                  </span>
                </div>
                
                {/* Always Visible CTA, Animated Arrow */}
                <div className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.15em] text-[#D4B78F] transition-all duration-500 flex items-center gap-2">
                  {labels.card.registerInterest} <span className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">{arrowIcon}</span>
                </div>
              </div>

              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
