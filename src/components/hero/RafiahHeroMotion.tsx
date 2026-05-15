'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import SpotlightButton from '@/components/ui/SpotlightButton';
import SpotlightCard from '@/components/ui/SpotlightCard';

export function HeroImageScale({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ scale: 1.04 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroStagger({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroFadeIn({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroButton({ children, className, href }: { children: ReactNode, className?: string, href?: string }) {
  if (href) {
    return (
      <SpotlightButton spotlightColor="oklch(90% 0.04 145 / 0.25)" spotlightSize={160}>
        <motion.a
          href={href}
          whileHover={{ scale: 0.98, opacity: 0.9 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.a>
      </SpotlightButton>
    );
  }
  return (
    <SpotlightButton spotlightColor="oklch(90% 0.04 145 / 0.25)" spotlightSize={160}>
      <motion.button
        whileHover={{ scale: 0.98, opacity: 0.9 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.button>
    </SpotlightButton>
  );
}

export function HeroStatSpotlight({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <SpotlightCard
      spotlightColor="oklch(95% 0.02 75 / 0.25)"
      spotlightSize={200}
      borderOnly
      className={className}
    >
      {children}
    </SpotlightCard>
  );
}
