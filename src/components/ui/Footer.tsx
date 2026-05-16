'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-brand-royal-green border-t border-white/5">

      {/* ── Upper: Developer + License ───────────────────── */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 sm:pt-28 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-start">

          {/* Column 1: Developer */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              {t('developer')}
            </p>
            <div className="relative w-[180px] h-[70px] sm:w-[220px] sm:h-[85px]">
              <Image
                src="/images/kira-logo.png"
                alt="Kira Estates"
                fill
                className="object-contain brightness-0 invert"
                sizes="220px"
              />
            </div>
          </div>

          {/* Column 2: License */}
          <div className="flex flex-col items-center gap-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              {t('licenseTitle')}
            </p>
            <p className="font-mono text-2xl sm:text-3xl text-white tracking-[0.08em]" dir="ltr">
              {t('licenseNumber')}
            </p>
            {/* REGA Badge */}
            <div className="relative w-[200px] h-[140px] sm:w-[240px] sm:h-[170px]">
              <Image
                src="/images/Rega-licence.png"
                alt="REGA - Off-Plan Sale & Lease License"
                fill
                className="object-contain"
                sizes="240px"
              />
            </div>
          </div>

          {/* Column 3: Sales */}
          <div className="flex flex-col items-center lg:items-end gap-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              {t('salesTitle')}
            </p>

            <a
              href="tel:920033262"
              className="font-mono text-2xl sm:text-3xl text-brand-gold hover:text-white transition-colors duration-300 tracking-[0.08em]"
              dir="ltr"
            >
              {t('salesNumber')}
            </a>

            <div className="flex items-center gap-3 mt-1">
              {/* Phone */}
              <a
                href="tel:920033262"
                aria-label="Call Sales"
                className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/966920033262"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="max-w-[800px] mx-auto px-4">
        <div className="h-px bg-white/8"></div>
      </div>

      {/* ── Lower: Social + Legal Links ──────────────────── */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-8">

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/kaborat_kira"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-10 h-10 border border-white/15 flex items-center justify-center text-white hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-300"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/kira_estates/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 border border-white/15 flex items-center justify-center text-white hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-300"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link
              href={`/${locale}/privacy`}
              className="text-white/50 hover:text-white/80 transition-colors duration-200"
            >
              {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span className="text-white/10">·</span>
            <Link
              href={`/${locale}/terms`}
              className="text-white/50 hover:text-white/80 transition-colors duration-200"
            >
              {isRtl ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-white/45 font-light tracking-wide">
            {t('copyright', { year: String(year) })}
          </p>

        </div>
      </div>

      {/* ── Credit ───────────────────────────────────────── */}
      <div className="border-t border-white/5 py-5">
        <p className="text-center text-[9px] text-white/35 tracking-[0.15em] uppercase font-light">
          Created by Hossam Khalaf
        </p>
      </div>

    </footer>
  );
}
