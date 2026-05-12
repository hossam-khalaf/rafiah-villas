import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ScrollStagger, ScrollFadeIn, ScrollScaleIn } from '@/components/motion/ScrollMotion';

const landmarks = [
  { key: 'viaRiyadh', distance: '5.7' },
  { key: 'diplomaticQuarter', distance: '5.9' },
  { key: 'laysenValley', distance: '7.0' },
  { key: 'diriyah', distance: '14.0' },
  { key: 'ksu', distance: '9.4' },
  { key: 'kfsh', distance: '4.2' },
  { key: 'kfmc', distance: '6.9' }
];

export default async function LocationSection() {
  const t = await getTranslations('Location');

  return (
    <section className="w-full bg-brand-offwhite text-black border-t border-black/10">
      <div className="max-w-[1800px] mx-auto">
        {/* Using standard physical grid which natively flips column order in RTL based on dir="rtl" */}
        <ScrollStagger className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
          
          {/* Map Column */}
          <ScrollScaleIn className="relative w-full h-[50vh] lg:h-auto min-h-[500px] bg-[#e8e6e1] order-last lg:order-none border-t lg:border-t-0 border-black/10">
            {/* Map Background Image */}
            <Image
              src="/images/rafiah-map.jpg"
              alt={t('mapLabel')}
              fill
              className="object-cover mix-blend-multiply opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Clickable Map Pin to Google Maps */}
            <a 
              href="https://www.google.com/maps/place/%D9%85%D8%B4%D8%B1%D9%88%D8%B9+%D8%B1%D9%81%D9%8A%D8%B9%D8%A9%E2%80%AD/@24.6339875,46.6697344,946m/data=!3m1!1e3!4m8!3m7!1s0x3e2f1b0071660fa1:0xfa0a6b55f9e3d473!8m2!3d24.6339875!4d46.6697344!9m1!1b1!16s%2Fg%2F11lf289kyl?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group z-10"
              aria-label="Open in Google Maps"
            >
              {/* Pulse Animation */}
              <span className="absolute w-14 h-14 bg-brand-royal-green rounded-full opacity-30 animate-ping"></span>
              
              {/* Solid Map Pin */}
              <span className="relative w-12 h-12 bg-brand-royal-green text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
            </a>

            {/* Floating Label Box */}
            <div className="absolute bottom-8 sm:bottom-12 start-8 sm:start-12 bg-brand-royal-green text-white px-6 py-4 shadow-xl border border-black/20">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">{t('mapLabel')}</p>
            </div>
          </ScrollScaleIn>

          {/* Content Column */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 py-16 lg:py-24">
            
            {/* Header Area */}
            <div className="mb-12 sm:mb-16">
              <ScrollFadeIn className="inline-flex items-center gap-4 text-brand-royal-green uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-6">
                <span className="w-8 sm:w-12 h-px bg-brand-royal-green"></span>
                {t('overline')}
              </ScrollFadeIn>
              
              <ScrollFadeIn>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-black mb-6">
                  {t('title')}
                </h2>
              </ScrollFadeIn>
              
              <ScrollFadeIn>
                <p className="text-sm sm:text-base lg:text-lg text-black/70 font-medium max-w-lg leading-relaxed">
                  {t('description')}
                </p>
              </ScrollFadeIn>
            </div>

            {/* Landmarks List */}
            <div className="max-w-lg">
              <ScrollFadeIn>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tighter text-black mb-8 inline-block border-b-2 border-brand-royal-green pb-3">
                  {t('landmarksTitle')}
                </h3>
              </ScrollFadeIn>

              <div className="flex flex-col border-t border-black/10">
                {landmarks.map((landmark) => (
                  <ScrollFadeIn key={landmark.key} className="flex justify-between items-center py-4 border-b border-black/10 group hover:bg-black/5 px-2 transition-colors">
                    <span className="text-sm sm:text-base font-bold text-black/80 group-hover:text-black">
                      {t(`landmarks.${landmark.key}`)}
                    </span>
                    <span className="font-mono text-lg font-light text-brand-royal-green tracking-tighter flex items-center gap-2">
                      {landmark.distance} <span className="text-[0.6rem] font-bold uppercase tracking-widest text-black/40">km</span>
                    </span>
                  </ScrollFadeIn>
                ))}
              </div>
            </div>

          </div>

        </ScrollStagger>
      </div>
    </section>
  );
}
