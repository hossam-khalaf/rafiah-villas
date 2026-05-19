import { getTranslations } from 'next-intl/server';
import { getAllVillas } from '@/lib/content/villas';
import VillasGrid from './VillasGrid';
import { ScrollStagger, ScrollFadeIn } from '@/components/motion/ScrollMotion';
import LuxuryBackground from '@/components/ui/LuxuryBackground';

export default async function VillasSection() {
  const t = await getTranslations('Collection');
  const ts = await getTranslations('Stats');

  // Villa inventory from Sanity (falls back to static data if Sanity is empty)
  const villas = await getAllVillas();

  // We pass the required translation strings to the Client Component
  const labels = {
    filters: {
      northFacade: t('filters.northFacade'),
      southFacade: t('filters.southFacade'),
      corner: t('filters.corner'),
    },
    card: {
      villa: t('card.villa'),
      currency: t('card.currency'),
      registerInterest: t('card.registerInterest'),
    },
    status: {
      available: ts('available'),
      sold: ts('sold'),
      reserved: ts('reserved'),
      booked: ts('booked'),
    }
  };

  return (
    <section className="relative w-full text-white py-24 sm:py-32 overflow-hidden">
      <LuxuryBackground variant="villas" />
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        <ScrollStagger className="w-full">
          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-24">
            <ScrollFadeIn>
              <div className="inline-flex items-center gap-4 text-brand-gold uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-8">
                <span className="w-8 sm:w-12 h-px bg-brand-gold"></span>
                {t('overline')}
              </div>
            </ScrollFadeIn>
            
            <ScrollFadeIn>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight text-white mb-8">
                {t('title')}
              </h2>
            </ScrollFadeIn>
            
            <ScrollFadeIn>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 font-medium leading-relaxed max-w-2xl">
                {t('description')}
              </p>
            </ScrollFadeIn>
          </div>

          {/* Interactive Grid */}
          <ScrollFadeIn className="w-full">
            <VillasGrid villas={villas} labels={labels} />
          </ScrollFadeIn>

        </ScrollStagger>

      </div>
    </section>
  );
}
