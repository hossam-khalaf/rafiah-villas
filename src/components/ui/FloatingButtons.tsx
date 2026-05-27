'use client';

import { useLocale } from 'next-intl';
import SpotlightButton from '@/components/ui/SpotlightButton';

interface FloatingButtonsProps {
  /** WhatsApp number from Sanity siteSettings — falls back to the default line */
  whatsappNumber?: string | null;
}

export default function FloatingButtons({ whatsappNumber }: FloatingButtonsProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const label360  = isRtl ? 'جولة افتراضية' : '360° Virtual Tour';
  const labelWA   = isRtl ? 'واتساب'        : 'WhatsApp';
  const waNumber  = (whatsappNumber || '966920033262').replace(/\D/g, '');

  return (
    <div className="fixed bottom-6 end-4 sm:end-6 z-50 flex flex-col items-end gap-3">

      {/* 360° Virtual Tour */}
      <a
        href="https://sa.3ddigital.solutions/ar/tour/villa-b3"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label360}
        className="group flex items-center gap-3"
      >
        {/* Tooltip */}
        <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/85 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-2 pointer-events-none whitespace-nowrap select-none">
          {label360}
        </span>

        {/* Button */}
        <SpotlightButton spotlightColor="oklch(78% 0.12 75 / 0.30)" spotlightSize={80}>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-gold border border-brand-black/10 flex flex-col items-center justify-center text-brand-black hover:bg-brand-black hover:text-brand-gold transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.45)] active:scale-[0.98]">
            {/* Rotation icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
            <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-tight leading-none mt-0.5">360°</span>
          </div>
        </SpotlightButton>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labelWA}
        className="group flex items-center gap-3"
      >
        {/* Tooltip */}
        <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/85 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-2 pointer-events-none whitespace-nowrap select-none">
          {labelWA}
        </span>

        {/* Button */}
        <SpotlightButton spotlightColor="oklch(85% 0.15 145 / 0.30)" spotlightSize={80}>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:bg-[#1db954] transition-colors duration-300 active:scale-[0.98]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-tight leading-none mt-0.5 text-white">CHAT</span>
          </div>
        </SpotlightButton>
      </a>

    </div>
  );
}
