'use client';

import { useState, useId, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import LuxuryBackground from '@/components/ui/LuxuryBackground';
import { ScrollFadeIn } from '@/components/motion/ScrollMotion';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SpotlightButton from '@/components/ui/SpotlightButton';

// ─── Props ────────────────────────────────────────────────────────────────────

interface RegisterInterestSectionProps {
  /** Pre-fill villa context when triggered from a villa card */
  villaId?:    string;
  villaTitle?: string;
  interest?:   string;
}

// ─── UTM / tracking params captured from URL on mount ────────────────────────

interface TrackingParams {
  sourcePage:  string;
  utmSource:   string;
  utmMedium:   string;
  utmCampaign: string;
  ref:         string;
}

function readTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return { sourcePage: '', utmSource: '', utmMedium: '', utmCampaign: '', ref: '' };
  const p = new URLSearchParams(window.location.search);
  return {
    sourcePage:  window.location.href,
    utmSource:   p.get('utm_source')   ?? '',
    utmMedium:   p.get('utm_medium')   ?? '',
    utmCampaign: p.get('utm_campaign') ?? '',
    ref:         p.get('ref')          ?? '',
  };
}

// ─── Form input component ─────────────────────────────────────────────────────

interface FormFieldProps {
  id:           string;
  label:        string;
  placeholder:  string;
  type?:        string;
  value:        string;
  onChange:     (v: string) => void;
  autoComplete?: string;
  required?:    boolean;
  disabled?:    boolean;
}

function FormField({ id, label, placeholder, type = 'text', value, onChange, autoComplete, required, disabled }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-overline font-bold uppercase tracking-[0.18em] text-white/85">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        className="
          w-full bg-white/10 border border-white/20 text-white placeholder-white/35
          px-5 py-4 text-sm font-light
          focus:outline-none focus:border-brand-gold/80 focus:bg-white/15
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors duration-200
        "
      />
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-16 gap-6"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-brand-royal-green border border-brand-gold/40 flex items-center justify-center"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4B78F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
      <div className="space-y-2">
        <p className="font-serif text-2xl text-brand-gold">{title}</p>
        <p className="text-sm text-white/80 font-light max-w-xs leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function RegisterInterestSection({ villaId, villaTitle, interest }: RegisterInterestSectionProps) {
  const t      = useTranslations('RegisterInterest');
  const locale = useLocale() as 'ar' | 'en';
  const uid    = useId();

  const [name,   setName]   = useState('');
  const [phone,  setPhone]  = useState('');
  const [hp,     setHp]     = useState('');     // honeypot — must stay empty
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  // Capture UTM params once on mount into a ref — no re-render needed
  const trackingRef = useRef<TrackingParams>({ sourcePage: '', utmSource: '', utmMedium: '', utmCampaign: '', ref: '' });
  useEffect(() => { trackingRef.current = readTrackingParams(); }, []);

  const isSubmitting = status === 'submitting';
  const isSuccess    = status === 'success';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    setStatus('submitting');
    setErrMsg('');

    try {
      const res = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:     name.trim(),
          phone:    phone.trim(),
          _hp:      hp,
          language: locale,
          interest: interest ?? 'villa_inquiry',
          villaId,
          villaTitle,
          ...trackingRef.current,
        }),
      });

      const data = await res.json() as { success: boolean; error?: string };

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrMsg(
          locale === 'ar'
            ? 'يرجى التحقق من البيانات والمحاولة مرة أخرى'
            : 'Please check your details and try again',
        );
      }
    } catch {
      setStatus('error');
      setErrMsg(
        locale === 'ar'
          ? 'حدث خطأ في الاتصال. سيتم إعادة المحاولة تلقائياً.'
          : 'Network issue — we will retry automatically.',
      );
    }
  }

  return (
    <section id="register-interest" className="relative w-full overflow-hidden" style={{ minHeight: '600px' }}>
      <LuxuryBackground variant="register" />

      {/* Content */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left column ──────────────────────────────────────── */}
          <ScrollFadeIn className="flex flex-col">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-3 mb-8 max-w-fit">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
              </span>
              <span className="text-overline font-bold uppercase tracking-[0.2em] text-brand-gold/80 border border-brand-gold/25 px-4 py-1.5">
                {t('urgencyBadge')}
              </span>
            </div>

            {/* Overline */}
            <div className="inline-flex items-center gap-4 text-white/70 uppercase tracking-[0.2em] text-overline font-semibold mb-6">
              <span className="w-8 h-px bg-white/40" />
              {t('overline')}
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-8">
              {t('titleLine1')}{' '}
              <span className="font-serif italic text-brand-gold font-normal">{t('titleLine2')}</span>
            </h2>

            {/* Body */}
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-md mb-12">
              {t('body')}
            </p>

            <div className="w-full h-px bg-white/20 mb-10" />

            {/* Sales hotline */}
            <div className="mb-8">
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-white/75 mb-2">
                {t('hotlineLabel')}
              </p>
              <a
                href={`tel:${t('hotlineNumber').replace(/\s/g, '')}`}
                className="font-serif text-3xl sm:text-4xl text-brand-gold tracking-tight hover:text-white transition-colors duration-300"
                dir="ltr"
              >
                {t('hotlineNumber')}
              </a>
            </div>

            {/* License */}
            <p className="text-overline text-white/65 font-light tracking-wide">
              {t('licenseLabel')} · {t('licenseNumber')}
            </p>
          </ScrollFadeIn>

          {/* ── Right column: form card ───────────────────────────── */}
          <ScrollFadeIn>
            <SpotlightCard
              spotlightSize={400}
              className="bg-black/20 border border-white/15 backdrop-blur-md p-8 sm:p-10"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <SuccessState key="success" title={t('successTitle')} body={t('successBody')} />
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    {/* Form header */}
                    <div className="mb-8">
                      <h3 className="font-serif text-2xl sm:text-3xl text-brand-gold mb-2 tracking-tight">
                        {t('formTitle')}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                        {t('formSubtitle')}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                      <FormField
                        id={`${uid}-name`}
                        label={t('nameLabel')}
                        placeholder={t('namePlaceholder')}
                        value={name}
                        onChange={setName}
                        autoComplete="name"
                        required
                        disabled={isSubmitting}
                      />

                      {/* Honeypot — hidden from real users, bots fill it */}
                      <div
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                      >
                        <input
                          type="text"
                          name="website"
                          value={hp}
                          onChange={e => setHp(e.target.value)}
                          autoComplete="off"
                          tabIndex={-1}
                        />
                      </div>

                      <FormField
                        id={`${uid}-phone`}
                        label={t('phoneLabel')}
                        placeholder={t('phonePlaceholder')}
                        type="tel"
                        value={phone}
                        onChange={setPhone}
                        autoComplete="tel"
                        required
                        disabled={isSubmitting}
                      />

                      {/* Error */}
                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.p
                            key="err"
                            initial={{ opacity: 0, y: -4, x: 0 }}
                            animate={{ opacity: 1, y: 0, x: [-4, 4, -4, 4, 0] }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            exit={{ opacity: 0 }}
                            role="alert"
                            className="text-xs text-red-400 font-medium"
                          >
                            {errMsg}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <SpotlightButton spotlightColor="oklch(78% 0.12 75 / 0.20)">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="
                            relative w-full bg-brand-gold text-brand-black py-4
                            text-[13px] font-bold uppercase tracking-[0.15em]
                            border border-brand-gold hover:bg-white hover:text-brand-royal-green transition-all duration-300 active:scale-[0.98]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            mt-2
                          "
                        >
                        <AnimatePresence mode="wait" initial={false}>
                          {isSubmitting ? (
                            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                              </svg>
                              {t('submitting')}
                            </motion.span>
                          ) : (
                            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              {t('submitButton')}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                      </SpotlightButton>

                      {/* Privacy note */}
                      <p className="text-overline text-white/65 text-center leading-relaxed mt-1">
                        {t('privacy')}{' '}
                        <Link
                          href={`/${locale}/privacy`}
                          className="underline underline-offset-2 hover:text-white/70 transition-colors"
                        >
                          {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                        </Link>
                      </p>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </ScrollFadeIn>

        </div>
      </div>
    </section>
  );
}
