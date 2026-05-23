import { GoogleAnalytics } from '@next/third-parties/google';
import type { Viewport } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Preloader from '@/components/ui/Preloader';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { getSiteSettings } from '@/lib/content/site-settings';
import { Cormorant_Garamond, DM_Sans, DM_Mono, Noto_Naskh_Arabic } from 'next/font/google';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: false,
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
  preload: false,
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
  preload: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://rafiah-villas.vercel.app'),
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} ${notoNaskhArabic.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-none"
        >
          {locale === 'ar' ? 'تخطى إلى المحتوى' : 'Skip to content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <div id="main-content">{children}</div>
          <FloatingButtons whatsappNumber={settings.whatsappNumber} />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-30FVM244TT'} />
    </html>
  );
}
