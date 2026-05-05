import { getTranslations, getLocale } from 'next-intl/server';
import { getVillaStatsContent } from '@/lib/content/villas';
import { HeroStagger, HeroFadeIn, HeroImageScale, HeroButton } from '@/components/hero/RafiahHeroMotion';
import LocationSection from '@/components/location/LocationSection';
import VillasSection from '@/components/villas/VillasSection';
import FloorPlansSection from '@/components/floorPlans/FloorPlansSection';

export default async function HomePage() {
  const t = await getTranslations('Hero');
  const stats = await getVillaStatsContent();
  const locale = await getLocale();
  
  const nextLocale = locale === 'ar' ? 'en' : 'ar';
  const nextLocaleLabel = locale === 'ar' ? 'EN' : 'عربي';

  return (
    <main className="min-h-screen flex flex-col font-sans bg-black selection:bg-[#012a17] selection:text-white">
      
      {/* Header / Language Switcher */}
      <div className="absolute top-0 w-full z-50 p-6 sm:p-10 flex justify-end items-center pointer-events-none">
        <a 
          href={`/${nextLocale}`} 
          className="pointer-events-auto text-white/80 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          {nextLocaleLabel}
        </a>
      </div>
      
      {/* Full Screen Video Hero */}
      <section className="relative w-full h-[100dvh] min-h-[750px] flex flex-col justify-center overflow-hidden pb-12">
        
        {/* Background Video with Motion Scale */}
        <div className="absolute inset-0 z-0 bg-black">
          <HeroImageScale className="w-full h-full relative">
            <video
              src="/videos/rafiah-hero.mp4"
              poster="/images/rafiah-hero-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            {/* Dark subtle overlay for readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </HeroImageScale>
        </div>

        {/* Content Overlay - Centered Flow */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center mt-16 sm:mt-24">
          
          <HeroStagger className="max-w-4xl flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full">
            
            {/* Subtitle Badge */}
            <HeroFadeIn>
              <div className="inline-flex items-center justify-center gap-4 text-white/80 uppercase tracking-[0.2em] text-xs sm:text-sm font-medium">
                <span className="w-8 sm:w-12 h-px bg-white/40"></span>
                {t('subtitle')}
                <span className="w-8 sm:w-12 h-px bg-white/40"></span>
              </div>
            </HeroFadeIn>
            
            {/* Title (Single Line) */}
            <HeroFadeIn>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-white px-4">
                {t('title')}
              </h1>
            </HeroFadeIn>
            
            {/* Location & Subheading */}
            <HeroFadeIn className="flex flex-col items-center gap-3">
              <p className="text-xs sm:text-sm lg:text-base text-white/70 uppercase tracking-[0.15em] font-medium">
                {t('location')}
              </p>
              <p className="text-sm sm:text-base text-white/90 font-medium">
                {t('developerIntro')}
              </p>
            </HeroFadeIn>

            {/* CTA */}
            <HeroFadeIn className="pt-2 sm:pt-4">
              <HeroButton className="bg-[#012a17] border border-[#012a17] text-white px-10 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#012a17] transition-colors duration-300 w-full sm:w-auto">
                {t('registerInterest')}
              </HeroButton>
            </HeroFadeIn>

            {/* Inline Stats Area */}
            <HeroFadeIn className="w-full pt-8 sm:pt-12">
              <div className="flex flex-wrap sm:flex-nowrap items-stretch justify-center">
                
                <div className="flex flex-col items-center justify-center border-e border-white/20 px-4 sm:px-6 lg:px-10 w-1/2 sm:w-auto border-b sm:border-b-0 pb-4 sm:pb-0">
                  <p className="font-mono text-3xl lg:text-4xl font-light tracking-tighter text-white mb-1 lg:mb-2 leading-none">{stats.total}</p>
                  <p className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/60 text-center max-w-[90px]">
                    {t('exclusiveVillas')}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center sm:border-e border-white/20 px-4 sm:px-6 lg:px-10 w-1/2 sm:w-auto border-b sm:border-b-0 pb-4 sm:pb-0">
                  <p className="font-mono text-3xl lg:text-4xl font-light tracking-tighter text-white mb-1 lg:mb-2 leading-none">300<span className="text-lg lg:text-xl">m²</span></p>
                  <p className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/60 text-center max-w-[90px]">
                    {t('startingArea')}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center border-e border-white/20 px-4 sm:px-6 lg:px-10 w-1/2 sm:w-auto pt-4 sm:pt-0">
                  <p className="font-mono text-3xl lg:text-4xl font-light tracking-tighter text-white mb-1 lg:mb-2 leading-none">4.5<span className="text-lg lg:text-xl">M</span></p>
                  <p className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/60 text-center max-w-[90px]">
                    {t('startingPrice')}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 w-1/2 sm:w-auto pt-4 sm:pt-0 relative">
                  <p className="font-mono text-3xl lg:text-4xl font-light tracking-tighter text-white mb-1 lg:mb-2 leading-none">100<span className="text-lg lg:text-xl">%</span></p>
                  <p className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/60 text-center max-w-[90px]">
                    {t('phaseOneSold')}
                  </p>
                </div>

              </div>
            </HeroFadeIn>
            
          </HeroStagger>
          
        </div>

        {/* Scrolling Bottom Marquee Ticker */}
        <div className="absolute bottom-0 left-0 w-full z-20 bg-[#012a17] border-t border-black/10 overflow-hidden h-12 flex items-center">
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center shrink-0 min-w-full justify-around">
               {[...Array(6)].map((_, i) => (
                 <p key={i} className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 px-8">
                    {t('ticker')}
                 </p>
               ))}
            </div>
            <div className="animate-marquee whitespace-nowrap flex items-center shrink-0 min-w-full justify-around" aria-hidden="true">
               {[...Array(6)].map((_, i) => (
                 <p key={i} className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 px-8">
                    {t('ticker')}
                 </p>
               ))}
            </div>
          </div>
        </div>

      </section>

      {/* Location Section */}
      <LocationSection />

      {/* Villas Collection Section */}
      <VillasSection />

      {/* Floor Plans Section */}
      <FloorPlansSection />
    </main>
  );
}
