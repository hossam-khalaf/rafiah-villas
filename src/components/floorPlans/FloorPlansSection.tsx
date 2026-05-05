'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';

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
    <section className="bg-[#181816] w-full py-24 sm:py-32 relative text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-serif text-[#D4B78F] mb-6 tracking-tight leading-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Villa Type Tabs */}
        <div className="flex border-b border-white/10 mb-16 sm:mb-24 relative">
          {(['corner', 'facade'] as VillaType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveVilla(type)}
              className={`pb-4 px-8 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors relative ${
                activeVilla === type ? 'text-[#D4B78F]' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t(`tabs.${type}`)}
              {activeVilla === type && (
                <motion.div 
                  layoutId="villaTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4B78F]"
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
              <h3 className="text-[#D4B78F] text-xs font-bold uppercase tracking-[0.2em] shrink-0">
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
                  transition={{ duration: 0.4 }}
                >
                  {rooms.map((room, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group hover:border-white/20 transition-colors"
                    >
                      <span className="text-white/80 font-light text-sm sm:text-base group-hover:text-white transition-colors">
                        {room.name}
                      </span>
                      <span className="text-[#D4B78F] font-serif text-sm sm:text-base tracking-widest">
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
                  className={`flex-1 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${
                    activeFloor === floor 
                      ? 'bg-[#D4B78F] text-[#0a0a0a]' 
                      : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {t(`floors.${floor}`)}
                </button>
              ))}
            </div>

            {/* Floor Plan Image Placeholder */}
            <div className="w-full aspect-square sm:aspect-[4/3] border border-white/10 bg-[#2e2d2b] relative overflow-hidden flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeVilla}-${activeFloor}-image`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white/20"
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4">
                    <path d="M3 3h18v18H3z M3 9h18 M9 21V9" />
                  </svg>
                  <p className="text-sm uppercase tracking-widest font-light text-center">
                    {t(`tabs.${activeVilla}`)} <br />
                    <span className="text-[#D4B78F]/50">{t(`floors.${activeFloor}`)} Plan</span>
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Optional: Once actual images are provided, map them here: */}
              {/* <img src={`/images/floor-plans/${activeVilla}-${activeFloor}.png`} className="object-contain w-full h-full" alt="Floor Plan" /> */}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
