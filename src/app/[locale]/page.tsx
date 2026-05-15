import { getTranslations } from 'next-intl/server';
import { getVillaStatsContent } from '@/lib/content/villas';
import { HeroStagger, HeroFadeIn, HeroImageScale, HeroButton, HeroStatSpotlight } from '@/components/hero/RafiahHeroMotion';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';
import Footer from '@/components/ui/Footer';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const LocationSection = dynamic(() => import('@/components/location/LocationSection'));
const VillasSection = dynamic(() => import('@/components/villas/VillasSection'));
const GallerySection = dynamic(() => import('@/components/gallery/GallerySection'));
const FloorPlansSection = dynamic(() => import('@/components/floorPlans/FloorPlansSection'));
const WarrantiesSection = dynamic(() => import('@/components/warranties/WarrantiesSection'));
const RegisterInterestSection = dynamic(() => import('@/components/registerInterest/RegisterInterestSection'));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'فلل رفيعة — المرحلة الثانية | حي الرفيعة، الرياض' : 'Rafiah Villas — Phase 2 | Al-Rafiah, Riyadh',
    description: isAr
      ? 'اكتشف فلل رفيعة المرحلة الثانية في حي الرفيعة بالرياض. 22 فيلا حصرية، ضمانات تصل إلى 20 سنة، من تطوير كيرا استيتس. سجّل اهتمامك الآن.'
      : 'Discover Rafiah Villas Phase 2 in Al-Rafiah, Riyadh. 22 exclusive villas with warranties up to 20 years, developed by Kira Estates. Register your interest now.',
    openGraph: {
      title: isAr ? 'فلل رفيعة — المرحلة الثانية' : 'Rafiah Villas — Phase 2',
      description: isAr
        ? '22 فيلا حصرية في حي الرفيعة، الرياض. ضمانات حتى 20 سنة.'
        : '22 exclusive villas in Al-Rafiah, Riyadh. Warranties up to 20 years.',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations('Hero');
  const stats = await getVillaStatsContent();

  return (
    <main className="min-h-screen flex flex-col font-sans bg-black selection:bg-[#012a17] selection:text-white">
      
      {/* Header / Language Switcher */}
      <div className="absolute top-0 w-full z-50 p-6 sm:p-10 flex justify-end items-center pointer-events-none">
        <LocaleSwitcher />
      </div>
      
      {/* Full Screen Video Hero */}
      <section className="relative w-full h-[100dvh] min-h-[750px] flex flex-col justify-center overflow-hidden pb-12">
        
        {/* Background Video with Motion Scale */}
        <div className="absolute inset-0 z-0 bg-black">
          <HeroImageScale className="w-full h-full relative">
            <Image 
              src="/images/rafiah-hero-poster.jpg"
              alt="Rafiah Villas"
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 object-cover z-0"
            />
            <video
              src="/videos/rafiah-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
            {/* Dark subtle overlay for readability */}
            <div className="absolute inset-0 bg-black/30 z-20"></div>
          </HeroImageScale>
        </div>

        {/* Content Overlay - Centered Flow */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center mt-16 sm:mt-24">
          
          <div className="max-w-4xl flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full">
            
            {/* Subtitle Badge */}
            <div className="animate-hero-fade-up delay-100 inline-flex items-center justify-center gap-4 text-white/80 uppercase tracking-[0.15em] text-[11px] sm:text-[13px] font-semibold">
              <span className="w-8 sm:w-12 h-px bg-white/40"></span>
              {t('subtitle')}
              <span className="w-8 sm:w-12 h-px bg-white/40"></span>
            </div>

            {/* Main Title - LCP Element */}
            <h1 className="animate-hero-fade-up delay-250 text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-white px-4">
              {t('title')}
            </h1>

            {/* Location & Subheading */}
            <div className="animate-hero-fade-up delay-400 flex flex-col items-center gap-3">
              <p className="text-[11px] sm:text-[13px] text-white/70 uppercase tracking-[0.15em] font-semibold">
                {t('location')}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white/90 font-normal">
                {t('developerIntro')}
              </p>
            </div>

            {/* CTA */}
            <div className="animate-hero-fade-up delay-400 pt-2 sm:pt-4">
              <HeroButton href="#register-interest" className="bg-[#012a17] border border-[#012a17] text-white px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#012a17] transition-colors duration-300 w-full sm:w-auto">
                {t('registerInterest')}
              </HeroButton>
            </div>

            {/* Inline Stats Area */}
            <HeroFadeIn className="w-full pt-8 sm:pt-12">
              <div className="flex flex-wrap sm:flex-nowrap items-stretch justify-center">
                
                <HeroStatSpotlight className="flex flex-col items-center justify-center border-e border-white/20 px-5 sm:px-7 lg:px-10 w-1/2 sm:w-auto border-b sm:border-b-0 pb-5 sm:pb-0">
                  <p className="font-mono text-4xl lg:text-5xl font-light tracking-tighter text-white mb-2 leading-none">{stats.total}</p>
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] text-white/80 text-center max-w-[100px] leading-tight">
                    {t('exclusiveVillas')}
                  </p>
                </HeroStatSpotlight>

                <HeroStatSpotlight className="flex flex-col items-center justify-center sm:border-e border-white/20 px-5 sm:px-7 lg:px-10 w-1/2 sm:w-auto border-b sm:border-b-0 pb-5 sm:pb-0">
                  <p className="font-mono text-4xl lg:text-5xl font-light tracking-tighter text-white mb-2 leading-none">300<span className="text-xl lg:text-2xl">m²</span></p>
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] text-white/80 text-center max-w-[100px] leading-tight">
                    {t('startingArea')}
                  </p>
                </HeroStatSpotlight>

                <HeroStatSpotlight className="flex flex-col items-center justify-center border-e border-white/20 px-5 sm:px-7 lg:px-10 w-1/2 sm:w-auto pt-5 sm:pt-0">
                  <p className="font-mono text-4xl lg:text-5xl font-light tracking-tighter text-white mb-2 leading-none">4.5<span className="text-xl lg:text-2xl">M</span></p>
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] text-white/80 text-center max-w-[100px] leading-tight">
                    {t('startingPrice')}
                  </p>
                </HeroStatSpotlight>

                <HeroStatSpotlight className="flex flex-col items-center justify-center px-5 sm:px-7 lg:px-10 w-1/2 sm:w-auto pt-5 sm:pt-0">
                  <p className="font-mono text-4xl lg:text-5xl font-light tracking-tighter text-white mb-2 leading-none">100<span className="text-xl lg:text-2xl">%</span></p>
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] text-white/80 text-center max-w-[100px] leading-tight">
                    {t('phaseOneSold')}
                  </p>
                </HeroStatSpotlight>

              </div>
            </HeroFadeIn>
            
          </div>
          
        </div>

        {/* Scrolling Bottom Marquee Ticker */}
        <div className="absolute bottom-0 left-0 w-full z-20 bg-[#012a17] border-t border-black/10 overflow-hidden h-12 flex items-center">
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center shrink-0 min-w-full justify-around">
               {[...Array(6)].map((_, i) => (
                 <p key={i} className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-white/90 px-8">
                    {t('ticker')}
                 </p>
               ))}
            </div>
            <div className="animate-marquee whitespace-nowrap flex items-center shrink-0 min-w-full justify-around" aria-hidden="true">
               {[...Array(6)].map((_, i) => (
                 <p key={i} className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-white/90 px-8">
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

      {/* Gallery Section */}
      <GallerySection />

      {/* Floor Plans Section */}
      <FloorPlansSection />

      {/* Warranties Section */}
      <WarrantiesSection />

      {/* Register Interest — Final CTA */}
      <RegisterInterestSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
