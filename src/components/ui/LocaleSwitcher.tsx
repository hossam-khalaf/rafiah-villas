'use client';

import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const nextLocale = locale === 'ar' ? 'en' : 'ar';
  const nextLocaleLabel = locale === 'ar' ? 'EN' : 'عربي';

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="pointer-events-auto text-white/80 hover:text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors bg-black/40"
    >
      {nextLocaleLabel}
    </Link>
  );
}
