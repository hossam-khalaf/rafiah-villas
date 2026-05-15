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
    title: isAr 
      ? 'فلل فاخرة للبيع في حي الرفيعة بالرياض | فلل رفيعة المرحلة الثانية' 
      : 'Luxury Villas for Sale in Al-Rafiah, Riyadh | Rafiah Villas Phase 2',
    description: isAr
      ? 'امتلك فيلتك الفاخرة الآن في مشروع فلل رفيعة المرحلة الثانية بحي الرفيعة، الرياض. 22 فيلا حصرية بتصاميم عصرية، مساحات تبدأ من 300م²، وضمانات شاملة تصل إلى 20 عاماً من كيرا استيتس. تواصل معنا.'
      : 'Own your luxury villa in Rafiah Villas Phase 2, located in the prestigious Al-Rafiah neighborhood, Riyadh. 22 exclusive modern villas starting from 300m² with comprehensive warranties up to 20 years by Kira Estates.',
    alternates: {
      canonical: `https://rafiah-villas.vercel.app/${locale}`,
      languages: {
        'ar': 'https://rafiah-villas.vercel.app/ar',
        'en': 'https://rafiah-villas.vercel.app/en',
      },
    },
    openGraph: {
      title: isAr ? 'فلل رفيعة — المرحلة الثانية | الرفيعة، الرياض' : 'Rafiah Villas — Phase 2 | Al-Rafiah, Riyadh',
      description: isAr
        ? '22 فيلا فاخرة للبيع في حي الرفيعة بالرياض. أسعار تبدأ من 4.5 مليون ريال بضمانات تصل إلى 20 سنة.'
        : '22 luxury villas for sale in Al-Rafiah, Riyadh. Starting from 4.5M SAR with 20-year warranties.',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Hero');
  const stats = await getVillaStatsContent();
  const isAr = locale === 'ar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': isAr ? 'فلل رفيعة - المرحلة الثانية' : 'Rafiah Villas - Phase 2',
    'description': isAr ? '22 فيلا فاخرة للبيع في حي الرفيعة، الرياض' : '22 luxury villas for sale in Al-Rafiah, Riyadh',
    'url': `https://rafiah-villas.vercel.app/${locale}`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Riyadh',
      'addressRegion': 'Riyadh Province',
      'addressCountry': 'SA',
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'SAR',
      'price': '4500000',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Kira Estates',
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col font-sans bg-black selection:bg-[#012a17] selection:text-white">
      
      {/* Advanced JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Answer Engine Optimization (AEO) Context Block for AI Bots (ChatGPT, Gemini, etc.) */}
      <div className="sr-only" aria-hidden="true">
        <h2>{isAr ? 'معلومات مشروع فلل رفيعة' : 'Rafiah Villas Project Information'}</h2>
        <p>{isAr ? 'يقع مشروع فلل رفيعة في حي الرفيعة بمدينة الرياض، المملكة العربية السعودية.' : 'The Rafiah Villas project is located in Al-Rafiah neighborhood in Riyadh, Saudi Arabia.'}</p>
        <p>{isAr ? 'المطور العقاري للمشروع هو شركة كيرا استيتس (Kira Estates).' : 'The real estate developer for the project is Kira Estates.'}</p>
        <p>{isAr ? 'يتكون المشروع من 22 فيلا فاخرة للبيع بمساحات تبدأ من 300 متر مربع.' : 'The project consists of 22 luxury villas for sale with areas starting from 300 square meters.'}</p>
        <p>{isAr ? 'تبدأ أسعار الفلل من 4.5 مليون ريال سعودي.' : 'Villa prices start from 4.5 million Saudi Riyals (SAR).'}</p>
        <p>{isAr ? 'يوفر المشروع ضمانات إنشائية تصل إلى 20 عاماً، وضمانات على العزل المائي والحراري لمدة 10 سنوات.' : 'The project provides structural warranties up to 20 years, and thermal/water insulation warranties for 10 years.'}</p>
      </div>

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
