'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-gold mb-6 tracking-tighter">
          RAFIAH
        </h1>
        <div className="w-12 h-px bg-brand-gold/50 mx-auto mb-8" />
        <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-8">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-brand-gold text-brand-black px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
