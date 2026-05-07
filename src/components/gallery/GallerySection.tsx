'use client';

import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ScrollFadeIn, ScrollStagger } from '@/components/motion/ScrollMotion';
import LuxuryBackground from '@/components/ui/LuxuryBackground';

const galleryImages = [
  '/images/gallery/1.webp',
  '/images/gallery/2.webp',
  '/images/gallery/3.webp',
  '/images/gallery/4.webp',
  '/images/gallery/5.webp',
  '/images/gallery/6.webp',
  '/images/gallery/7.webp',
  '/images/gallery/8.webp',
  '/images/gallery/9.webp',
  '/images/gallery/10.webp',
];

const slides = galleryImages.map((src) => ({ src }));

export default function GallerySection() {
  const t = useTranslations('Gallery');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Embla handles drag vs click detection natively and supports RTL
  const [emblaRef] = useEmblaCarousel({
    direction: isRtl ? 'rtl' : 'ltr',
    loop: false,
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  return (
    <>
      <section className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/10">
        <LuxuryBackground variant="gallery" />
        <div className="relative z-10">
        {/* Header */}
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-16 sm:mb-24">
          <ScrollStagger>
            <ScrollFadeIn>
              <div className="inline-flex items-center gap-4 text-[#D4B78F] uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-8">
                <span className="w-8 sm:w-12 h-px bg-[#D4B78F]"></span>
                {t('overline')}
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight text-white mb-8">
                {t('title')}
              </h2>
            </ScrollFadeIn>
            <ScrollFadeIn>
              <p className="text-sm sm:text-base lg:text-lg text-white/60 font-medium leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
            </ScrollFadeIn>
          </ScrollStagger>
        </div>

        {/* Embla Carousel */}
        <div
          ref={emblaRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 xl:px-12">
            {galleryImages.map((src, index) => (
              <motion.div
                key={src}
                className="relative shrink-0 w-[80vw] sm:w-[60vw] lg:w-[40vw] aspect-[16/10] overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.4) }}
                // Open lightbox only on click (Embla prevents this during drag automatically)
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={src}
                  alt={`Rafiah Villas — Image ${index + 1}`}
                  fill
                  draggable={false}
                  className="object-cover pointer-events-none transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
                />
                {/* Hover expand hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-11 h-11 border border-white/70 flex items-center justify-center backdrop-blur-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hint */}
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-10 flex justify-end">
          <div className="flex items-center gap-3 text-white/30 text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest">
            <span>{isRtl ? 'اسحب أو اضغط للمعاينة' : 'Drag or tap to preview'}</span>
            <div className="w-10 h-px bg-white/20"></div>
          </div>
        </div>
        </div>{/* end relative z-10 */}
      </section>

      {/* YARL Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.96)' },
        }}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: false }}
      />
    </>
  );
}
