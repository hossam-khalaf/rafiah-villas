'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import LuxuryBackground from '@/components/ui/LuxuryBackground';
import { ScrollFadeIn } from '@/components/motion/ScrollMotion';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SpotlightButton from '@/components/ui/SpotlightButton';

const getFloorPlanImage = (villa: VillaType, floor: FloorType) => {
  if (villa === 'facade' && floor === 'ground') return '/images/facade-ground-floor-plan.png';
  if (villa === 'facade' && floor === 'second') return '/images/facade-second-floor-plan.png';
  if (villa === 'corner' && floor === 'ground') return '/images/corner-ground-floor-plan.webp';
  return `/images/${villa}-${floor}-floor-plan.webp`;
};

type VillaType = 'corner' | 'facade';
type FloorType = 'ground' | 'first' | 'second';

interface Room {
  name: string;
  dim: string;
}

export default function FloorPlansSection() {
  const t = useTranslations('FloorPlans');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [activeVilla, setActiveVilla] = useState<VillaType>('corner');
  const [activeFloor, setActiveFloor] = useState<FloorType>('ground');

  // Helper to safely get the array of rooms
  const rooms: Room[] = t.raw(`rooms.${activeVilla}.${activeFloor}`) || [];

  return (
    <section className="relative w-full py-24 sm:py-32 text-white border-t border-white/10 overflow-hidden">
      <LuxuryBackground variant="floorplans" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <ScrollFadeIn>
            <div className="inline-flex items-center gap-4 text-brand-gold uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-8">
              <span className="w-8 sm:w-12 h-px bg-brand-gold"></span>
              {t('overline')}
            </div>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-white mb-4">
              {t('titleLine1')}{' '}
              <span className="font-serif italic text-brand-gold font-normal">{t('titleLine2')}</span>
            </h2>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mt-6">
              {t('subtitle')}
            </p>
          </ScrollFadeIn>
        </div>

        {/* Villa Type Tabs */}
        <div className="flex border-b border-white/10 mb-16 sm:mb-24 relative">
          {(['corner', 'facade'] as VillaType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveVilla(type)}
              className={`pb-4 px-6 sm:px-8 text-[13px] sm:text-sm font-bold uppercase tracking-[0.12em] transition-colors relative ${
                activeVilla === type ? 'text-brand-gold' : 'text-white/60 hover:text-white/90'
              }`}
            >
              {t(`tabs.${type}`)}
              {activeVilla === type && (
                <motion.div
                  layoutId="villaTabIndicator"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Rooms List */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            
            {/* Floor Overline */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.18em] shrink-0">
                {t(`floors.${activeFloor}`)}
              </h3>
              <div className="h-px bg-white/10 w-full" />
            </div>

            {/* Rooms List */}
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeVilla}-${activeFloor}`}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {rooms.map((room, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-white/50 group-hover:text-brand-gold transition-colors w-6">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-white/80 font-light text-[13px] sm:text-base group-hover:text-white transition-colors">
                          {room.name}
                        </span>
                      </div>
                      <span className="text-brand-gold font-serif text-sm sm:text-[15px] tracking-wide">
                        {room.dim}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Floor Tabs & Floor Plan Image */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col">
            
            {/* Floor Tabs (Segmented Control) */}
            <div className="flex border border-white/10 w-full mb-8 sm:mb-12">
              {(['ground', 'first', 'second'] as FloorType[]).map((floor) => (
                <button
                  key={floor}
                  onClick={() => setActiveFloor(floor)}
                  className={`flex-1 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all ${
                    activeFloor === floor 
                      ? 'bg-brand-gold text-[#0a0a0a]' 
                      : 'bg-transparent text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {t(`floors.${floor}`)}
                </button>
              ))}
            </div>

            {/* Floor Plan Image Placeholder */}
            <SpotlightCard
              spotlightSize={450}
              className="w-full aspect-square sm:aspect-[4/3] border border-white/10 bg-black/25 relative flex items-center justify-center p-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeVilla}-${activeFloor}-image`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white/20"
                >
                  <Image 
                    src={getFloorPlanImage(activeVilla, activeFloor)}
                    alt={`${activeVilla} ${activeFloor} floor plan`}
                    fill
                    className="object-contain p-4 sm:p-8"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                  />
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>

          </div>

        </div>
      </div>
    </section>
  );
}
