'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isComplete = false;

    const fallbackTimer = setTimeout(() => {
      if (isComplete) return;
      isComplete = true;
      setTimeout(() => setIsLoading(false), 300);
    }, 4000);

    const minShown = new Promise<void>((r) => setTimeout(r, 1200));
    const pageLoaded = new Promise<void>((r) => {
      if (document.readyState === 'complete') return r();
      const onLoad = () => r();
      window.addEventListener('load', onLoad, { once: true });
    });

    Promise.all([minShown, pageLoaded]).then(() => {
      if (isComplete) return;
      isComplete = true;
      clearTimeout(fallbackTimer);
      setTimeout(() => setIsLoading(false), 300);
    });

    return () => { isComplete = true; clearTimeout(fallbackTimer); };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12 flex flex-col items-center"
          >
            <h1 className="font-serif text-4xl sm:text-6xl tracking-tighter text-brand-gold mb-4">
              RAFIAH
            </h1>
            <div className="w-12 h-px bg-brand-gold/50"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
