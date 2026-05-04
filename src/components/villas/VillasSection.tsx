import { getTranslations } from 'next-intl/server';
import { VILLAS } from '@/data/villas';
import VillasGrid from './VillasGrid';
import { HeroStagger, HeroFadeIn } from '@/components/hero/RafiahHeroMotion';

export default async function VillasSection() {
  const t = await getTranslations('Collection');
  const ts = await getTranslations('Stats');

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
    }
  };

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-24 sm:py-32">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        <HeroStagger className="w-full">
          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-24">
            <HeroFadeIn>
              <div className="inline-flex items-center gap-4 text-[#D4B78F] uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-8">
                <span className="w-8 sm:w-12 h-px bg-[#D4B78F]"></span>
                {t('overline')}
              </div>
            </HeroFadeIn>
            
            <HeroFadeIn>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight text-white mb-8">
                {t('title')}
              </h2>
            </HeroFadeIn>
            
            <HeroFadeIn>
              <p className="text-sm sm:text-base lg:text-lg text-white/60 font-medium leading-relaxed max-w-2xl">
                {t('description')}
              </p>
            </HeroFadeIn>
          </div>

          {/* Interactive Grid */}
          <HeroFadeIn className="w-full">
            <VillasGrid villas={VILLAS} labels={labels} />
          </HeroFadeIn>

        </HeroStagger>

      </div>
    </section>
  );
}
