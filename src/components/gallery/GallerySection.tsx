'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      const sliderWidth = sliderRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      
      if (isRtl) {
        setConstraints({ left: 0, right: sliderWidth - containerWidth });
      } else {
        setConstraints({ left: -(sliderWidth - containerWidth), right: 0 });
      }
    }
  }, [isRtl]);

  return (
    <section className="w-full bg-[#181816] py-24 sm:py-32 overflow-hidden border-t border-white/10">
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

      {/* Draggable Slider Container */}
      <div ref={containerRef} className="w-full cursor-grab active:cursor-grabbing">
        <motion.div
          ref={sliderRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 xl:px-12"
          style={{ 
            display: 'flex',
            flexDirection: isRtl ? 'row-reverse' : 'row'
          }}
        >
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              className="relative shrink-0 w-[80vw] sm:w-[60vw] lg:w-[45vw] aspect-[16/10] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 45vw"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interaction Hint */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-12 flex justify-end">
        <div className="flex items-center gap-3 text-white/30 text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest">
          <span>{isRtl ? 'اسحب للتصفح' : 'Drag to explore'}</span>
          <div className="w-12 h-px bg-white/20"></div>
        </div>
      </div>
    </section>
  );
}
