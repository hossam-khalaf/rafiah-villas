'use client';

import { useTranslations } from 'next-intl';
import { ScrollStagger, ScrollFadeIn } from '@/components/motion/ScrollMotion';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface WarrantyItem {
  years: string;
  yearsSuffix?: string;
  category: string;
  contractor: string;
  bonus?: string;
}

export default function WarrantiesSection() {
  const t = useTranslations('Warranties');

  const items = t.raw('items') as WarrantyItem[];

  return (
    <section className="w-full bg-brand-offwhite text-black border-t border-black/10 py-24 sm:py-32">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Header */}
        <ScrollStagger className="mb-16 sm:mb-24">
          <ScrollFadeIn>
            <div className="inline-flex items-center gap-4 text-brand-royal-green uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-8">
              <span className="w-8 sm:w-12 h-px bg-brand-royal-green"></span>
              {t('overline')}
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-black mb-4">
              {t('titleLine1')}{' '}
              <span className="font-serif italic text-brand-gold-dark font-normal">{t('titleLine2')}</span>
            </h2>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <p className="text-sm sm:text-base lg:text-lg text-black/60 font-medium leading-relaxed max-w-2xl mt-6">
              {t('subtitle')}
            </p>
          </ScrollFadeIn>
        </ScrollStagger>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {items.map((item, index) => (
            <ScrollFadeIn
              key={index}
              className="flex flex-col"
            >
            <SpotlightCard
              spotlightColor="oklch(65% 0.12 75 / 0.35)"
              spotlightSize={300}
              className="bg-brand-offwhite hover:bg-white transition-colors duration-300 p-5 sm:p-10 flex flex-col flex-1 group"
            >
              {/* Year number */}
              <div className="mb-4 sm:mb-6">
                <p className="font-serif text-5xl sm:text-8xl text-brand-gold-dark leading-none tracking-tight">
                  {item.years}
                </p>
                {item.yearsSuffix && (
                  <p className="text-overline font-bold uppercase tracking-[0.2em] text-black/40 mt-1">
                    {item.yearsSuffix}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-brand-gold-dark/50 mb-6 group-hover:w-16 transition-all duration-500"></div>

              {/* Category */}
              <p className="font-bold text-sm sm:text-base lg:text-[15px] text-black mb-2 leading-snug">
                {item.category}
              </p>

              {/* Bonus */}
              {item.bonus && (
                <p className="text-overline sm:text-xs text-brand-royal-green font-semibold mb-2 tracking-wide">
                  + {item.bonus}
                </p>
              )}

              {/* Contractor */}
              <p className="text-xs sm:text-[13px] text-black/50 mt-auto pt-4 leading-relaxed">
                {item.contractor}
              </p>
            </SpotlightCard>
            </ScrollFadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
