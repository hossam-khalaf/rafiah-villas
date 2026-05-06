import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'سياسة الخصوصية | Privacy Policy — Rafiah Villas',
  };
}

const arContent = {
  lang: 'ar',
  dir: 'rtl',
  back: 'العودة إلى الرئيسية',
  badge: 'نظام حماية البيانات الشخصية — المملكة العربية السعودية',
  title: 'سياسة الخصوصية',
  effective: 'تاريخ النفاذ: مايو ٢٠٢٦',
  intro: 'تلتزم شركة كيرا استيتس ("الشركة"، "نحن") بحماية خصوصيتك وفقاً لأحكام نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم م/19 وتاريخ 1443/2/9هـ ولائحته التنفيذية. توضح هذه السياسة كيفية جمع بياناتك الشخصية واستخدامها وتخزينها والحقوق المكفولة لك.',
  sections: [
    {
      title: '١. البيانات التي نجمعها',
      body: 'عند تسجيل اهتمامك عبر نموذج "سجّل اهتمامك" في موقع فلل رفيعة، نجمع البيانات التالية:\n• الاسم الكامل\n• رقم الجوال\n• تاريخ ووقت التسجيل\n• عنوان الصفحة (URL) عند التسجيل',
    },
    {
      title: '٢. الغرض من الجمع',
      body: 'نستخدم بياناتك الشخصية لغرض وحيد ومحدد، وهو:\n• التواصل معك بشأن وحدات مشروع فلل رفيعة وتفاصيل التسعير والتوافر\n• الرد على استفساراتك عبر فريق المبيعات\n\nلن تُستخدم بياناتك لأي غرض تسويقي آخر دون الحصول على موافقتك المسبقة.',
    },
    {
      title: '٣. مدة الاحتفاظ بالبيانات',
      body: 'تُحتفظ ببياناتك لمدة لا تتجاوز (٣٦) شهراً من تاريخ التسجيل، أو حتى تحقق الغرض من جمعها أو طلبك حذفها، أيهما أسبق.',
    },
    {
      title: '٤. مشاركة البيانات',
      body: 'لا نبيع بياناتك الشخصية ولا نؤجرها لأي طرف ثالث. قد نشاركها فقط مع:\n• فريق المبيعات الداخلي لشركة كيرا استيتس\n• مزودي خدمات تقنية المعلومات الضروريين لتشغيل المنصة، وفق اتفاقيات معالجة بيانات ملزمة\n• الجهات الحكومية إذا اقتضى ذلك النظام والقانون',
    },
    {
      title: '٥. تخزين البيانات وحمايتها',
      body: 'تُخزَّن بياناتك على خوادم آمنة ومشفرة. نطبّق ضوابط وصول صارمة ونراجع أنظمة الحماية بصفة دورية للحدّ من مخاطر الوصول غير المصرح به أو الإفصاح أو التعديل أو الإتلاف.',
    },
    {
      title: '٦. حقوقك بموجب نظام حماية البيانات الشخصية',
      body: 'يكفل لك النظام الحقوق التالية:\n• الاطلاع على بياناتك الشخصية المحفوظة لدينا\n• تصحيح أي بيانات غير دقيقة\n• طلب حذف بياناتك (حق النسيان)\n• الاعتراض على معالجة بياناتك أو تقييدها\n• الحصول على نسخة من بياناتك بصيغة إلكترونية قابلة للنقل\n\nلممارسة أي من هذه الحقوق، تواصل معنا على رقم: 920 033 262',
    },
    {
      title: '٧. التواصل والشكاوى',
      body: 'لأي استفسار متعلق بهذه السياسة أو للإبلاغ عن أي مخاوف تتعلق بخصوصيتك:\n• الهاتف: 920 033 262\n• الشركة: كيرا استيتس — الرياض، المملكة العربية السعودية\n\nيحق لك أيضاً تقديم شكوى إلى الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا) إذا رأيت أن حقوقك لم تُحترم.',
    },
    {
      title: '٨. تحديثات السياسة',
      body: 'قد نُحدّث هذه السياسة من وقت لآخر. سيُنشر تاريخ النفاذ الجديد في أعلى هذه الصفحة عند أي تعديل جوهري.',
    },
  ],
};

const enContent = {
  lang: 'en',
  dir: 'ltr',
  back: 'Back to Home',
  badge: 'Personal Data Protection Law — Kingdom of Saudi Arabia',
  title: 'Privacy Policy',
  effective: 'Effective Date: May 2026',
  intro: 'Kira Estates ("the Company", "we") is committed to protecting your privacy in accordance with the Personal Data Protection Law (PDPL) issued by Royal Decree No. M/19 dated 1443/2/9H and its implementing regulations. This policy explains how we collect, use, store, and protect your personal data, and the rights available to you.',
  sections: [
    {
      title: '1. Data We Collect',
      body: 'When you register your interest via the "Register Your Interest" form on the Rafiah Villas website, we collect the following data:\n• Full name\n• Mobile number\n• Date and time of registration\n• Page URL at the time of submission',
    },
    {
      title: '2. Purpose of Collection',
      body: 'We use your personal data for a single, specific purpose:\n• To contact you regarding Rafiah Villas units, pricing, and availability\n• To respond to your enquiry through our sales team\n\nYour data will not be used for any other marketing purpose without your prior consent.',
    },
    {
      title: '3. Data Retention',
      body: 'Your data is retained for no longer than 36 months from the date of registration, or until the purpose for which it was collected is fulfilled or you request deletion — whichever comes first.',
    },
    {
      title: '4. Data Sharing',
      body: 'We do not sell or rent your personal data to any third party. We may share it only with:\n• The internal sales team of Kira Estates\n• IT service providers necessary to operate the platform, under binding data processing agreements\n• Government authorities where required by law',
    },
    {
      title: '5. Data Storage & Security',
      body: 'Your data is stored on secure, encrypted servers. We apply strict access controls and conduct regular security reviews to minimise the risk of unauthorised access, disclosure, modification, or destruction.',
    },
    {
      title: '6. Your Rights Under the PDPL',
      body: 'The PDPL guarantees you the following rights:\n• Access your personal data held by us\n• Correct any inaccurate data\n• Request deletion of your data (right to erasure)\n• Object to or restrict the processing of your data\n• Receive a portable electronic copy of your data\n\nTo exercise any of these rights, contact us at: 920 033 262',
    },
    {
      title: '7. Contact & Complaints',
      body: 'For any enquiry related to this policy or to raise a privacy concern:\n• Phone: 920 033 262\n• Company: Kira Estates — Riyadh, Kingdom of Saudi Arabia\n\nYou also have the right to lodge a complaint with the Saudi Data and Artificial Intelligence Authority (SDAIA) if you believe your rights have not been respected.',
    },
    {
      title: '8. Policy Updates',
      body: 'We may update this policy from time to time. A new effective date will be published at the top of this page upon any material change.',
    },
  ],
};

export default async function PrivacyPage() {
  const locale = await getLocale();
  const c = locale === 'ar' ? arContent : enContent;
  const backHref = `/${locale}`;

  return (
    <main
      className="min-h-screen bg-[#FAF9F6] text-black font-sans"
      lang={c.lang}
      dir={c.dir}
    >
      {/* Top bar */}
      <div className="border-b border-black/10 px-6 sm:px-12 py-5 flex items-center justify-between">
        <Link
          href={backHref}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#012a17] hover:text-black transition-colors flex items-center gap-3"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={c.dir === 'rtl' ? 'rotate-180' : ''}>
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          {c.back}
        </Link>
        <p className="font-serif text-lg text-[#012a17] tracking-tight hidden sm:block">RAFIAH</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 sm:px-12 py-16 sm:py-24">

        {/* PDPL badge */}
        <div className="inline-flex items-center gap-3 mb-10">
          <span className="w-2 h-2 bg-[#012a17] shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#012a17]/70">
            {c.badge}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-black mb-4">
          {c.title}
        </h1>

        <p className="text-xs font-mono text-black/40 uppercase tracking-widest mb-12 sm:mb-16">
          {c.effective}
        </p>

        {/* Intro */}
        <p className="text-sm sm:text-base text-black/70 leading-relaxed mb-12 sm:mb-16 border-s-2 border-[#012a17] ps-5">
          {c.intro}
        </p>

        {/* Sections */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {c.sections.map((section, i) => (
            <div key={i} className="border-t border-black/10 pt-8">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-black mb-4">
                {section.title}
              </h2>
              <div className="text-sm sm:text-base text-black/65 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[11px] text-black/40 font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Kira Estates — Rafiah Villas
          </p>
          <Link
            href={backHref}
            className="text-[11px] font-bold uppercase tracking-widest text-[#012a17] hover:text-black transition-colors"
          >
            {c.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
