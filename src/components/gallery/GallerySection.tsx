'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ScrollFadeIn, ScrollStagger } from '@/components/motion/ScrollMotion';

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

export default function GallerySection() {
  const t = useTranslations('Gallery');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Recalculate drag constraints (always LTR physics, RTL just flips image order)
  useEffect(() => {
    const calculate = () => {
      if (sliderRef.current && containerRef.current) {
        const sliderWidth = sliderRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const maxDrag = sliderWidth - containerWidth;
        setDragConstraints({ left: -maxDrag, right: 0 });
      }
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % galleryImages.length));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      // Respect RTL for arrow keys
      if (e.key === 'ArrowRight') isRtl ? goPrev() : goNext();
      if (e.key === 'ArrowLeft') isRtl ? goNext() : goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, isRtl, goNext, goPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  // Images displayed in RTL are reversed
  const orderedImages = isRtl ? [...galleryImages].reverse() : galleryImages;

  const prevLabel = isRtl ? '→' : '←';
  const nextLabel = isRtl ? '←' : '→';

  return (
    <>
      <section className="w-full bg-[#181816] py-24 sm:py-32 overflow-hidden border-t border-white/10">
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

        {/* Draggable Slider — always LTR physics, images reversed for RTL */}
        <div ref={containerRef} className="w-full cursor-grab active:cursor-grabbing select-none">
          <motion.div
            ref={sliderRef}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.08}
            dragMomentum={true}
            className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 xl:px-12"
          >
            {orderedImages.map((src, index) => {
              // Map back to original index for lightbox
              const originalIndex = isRtl ? galleryImages.length - 1 - index : index;
              return (
                <motion.div
                  key={src}
                  className="relative shrink-0 w-[80vw] sm:w-[60vw] lg:w-[40vw] aspect-[16/10] overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.04 }}
                  onClick={() => openLightbox(originalIndex)}
                >
                  <Image
                    src={src}
                    alt={`Gallery Image ${originalIndex + 1}`}
                    fill
                    draggable={false}
                    className="object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
                  />
                  {/* Hover overlay with expand icon */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 border border-white/60 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Interaction hint */}
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-10 flex justify-end">
          <div className="flex items-center gap-3 text-white/30 text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest">
            <span>{isRtl ? 'اسحب أو اضغط للمعاينة' : 'Drag or tap to preview'}</span>
            <div className="w-10 h-px bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* ───── Lightbox ───── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Image wrapper — stop propagation so clicking image doesn't close */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={lightboxIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[90vw] max-w-5xl aspect-[16/10]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[lightboxIndex]}
                  alt={`Gallery Image ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-white/50 tracking-widest"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 end-6 w-10 h-10 border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); isRtl ? goNext() : goPrev(); }}
              className="absolute start-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors text-xl"
              aria-label="Previous"
            >
              {prevLabel}
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); isRtl ? goPrev() : goNext(); }}
              className="absolute end-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors text-xl"
              aria-label="Next"
            >
              {nextLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
