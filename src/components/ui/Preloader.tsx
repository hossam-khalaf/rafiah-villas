'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    let isComplete = false;

    const completeLoading = () => {
      if (isComplete) return;
      isComplete = true;
      setProgress(100);
      setTimeout(() => setIsLoading(false), 600); // Small delay to enjoy the 100%
    };

    // Fake progress incrementer
    const tick = () => {
      if (isComplete) return;
      
      currentProgress += Math.random() * 8 + 2; // Jump by 2-10%
      if (currentProgress > 92) currentProgress = 92; // Cap at 92% until actual load
      
      setProgress(Math.floor(currentProgress));

      if (currentProgress < 92) {
        setTimeout(tick, Math.random() * 200 + 50); // Random delay 50-250ms
      }
    };

    // Start ticking
    tick();

    // Check if already loaded
    if (document.readyState === 'complete') {
      completeLoading();
    } else {
      window.addEventListener('load', completeLoading);
    }

    // Hard fallback: never stuck for more than 5 seconds
    const fallbackTimer = setTimeout(completeLoading, 5000);

    return () => {
      isComplete = true;
      window.removeEventListener('load', completeLoading);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Prevent scrolling while loading
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
          className="fixed inset-0 z-[100] bg-[#0f0f0f] flex flex-col items-center justify-center text-white"
        >
          {/* Logo or Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12 flex flex-col items-center"
          >
            <h1 className="font-serif text-4xl sm:text-6xl tracking-tighter text-[#D4B78F] mb-4">
              RAFIAH
            </h1>
            <div className="w-12 h-px bg-[#D4B78F]/50"></div>
          </motion.div>

          {/* Percentage */}
          <div className="flex items-end gap-1 mb-6">
            <motion.p 
              className="font-mono text-5xl sm:text-7xl font-light tracking-tighter"
              // Adding a key to force re-animation could be noisy, so we just render the number.
            >
              {progress}
            </motion.p>
            <span className="font-mono text-xl sm:text-2xl text-white/50 mb-1 sm:mb-2">%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-64 sm:w-96 h-px bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[#D4B78F]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
