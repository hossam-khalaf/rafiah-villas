import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'ar'
      ? 'الشروط والأحكام — فلل رفيعة'
      : 'Terms & Conditions — Rafiah Villas',
  };
}

const arContent = {
  lang: 'ar',
  dir: 'rtl',
  back: 'العودة إلى الرئيسية',
  badge: 'شروط استخدام الموقع الإلكتروني',
  title: 'الشروط والأحكام',
  effective: 'تاريخ النفاذ: مايو ٢٠٢٦',
  intro: 'تحكم هذه الشروط والأحكام استخدامك لموقع فلل رفيعة الإلكتروني (\"الموقع\") المُدار من قِبل شركة كيرا استيتس (\"الشركة\"، \"نحن\"). باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط. إذا لم توافق على أيٍّ منها، يُرجى عدم استخدام الموقع.',
  sections: [
    {
      title: '١. طبيعة المحتوى',
      body: 'جميع المعلومات المعروضة على الموقع، بما في ذلك الأسعار والمساحات وحالة التوافر ومخططات الطوابق والصور، هي لأغراض إعلامية عامة فقط ولا تُشكّل عرضاً ملزماً أو تعاقدياً.\n\nتحتفظ الشركة بحق تعديل الأسعار والمواصفات وحالة التوافر دون إشعار مسبق. يُعدّ العقد المبرم بين الطرفين هو المرجع الوحيد والنهائي.',
    },
    {
      title: '٢. تسجيل الاهتمام',
      body: 'يُعدّ تسجيل اهتمامك عبر الموقع تعبيراً عن رغبتك في الحصول على معلومات إضافية فقط، ولا يُنشئ حجزاً أو التزاماً بالشراء من أي طرف.\n\nسيتواصل معك فريق المبيعات خلال أوقات العمل الرسمية لمناقشة التفاصيل.',
    },
    {
      title: '٣. حقوق الملكية الفكرية',
      body: 'جميع المحتويات المعروضة على الموقع، بما فيها النصوص والصور والتصاميم والشعارات والمخططات، هي ملك لشركة كيرا استيتس ومحمية بموجب أنظمة حماية حقوق الملكية الفكرية في المملكة العربية السعودية.\n\nيُحظر نسخ أو إعادة إنتاج أو توزيع أي محتوى من الموقع دون إذن كتابي مسبق.',
    },
    {
      title: '٤. دقة المعلومات',
      body: 'تسعى الشركة لضمان دقة المعلومات المعروضة، إلا أنها لا تضمن خلوّها من الأخطاء أو أنها محدّثة في جميع الأوقات.\n\nتُقدَّم المعلومات \"كما هي\" دون أي ضمانات صريحة أو ضمنية بشأن اكتمالها أو دقتها أو ملاءمتها لغرض معين.',
    },
    {
      title: '٥. تحديد المسؤولية',
      body: 'لا تتحمل الشركة أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو الاعتماد على المعلومات المعروضة فيه.\n\nلا تتحمل الشركة مسؤولية أي انقطاع في خدمة الموقع أو أي أخطاء تقنية.',
    },
    {
      title: '٦. الروابط الخارجية',
      body: 'قد يحتوي الموقع على روابط لمواقع خارجية. لا تتحمل الشركة أي مسؤولية عن محتوى أو سياسات الخصوصية الخاصة بتلك المواقع.',
    },
    {
      title: '٧. القانون الواجب التطبيق',
      body: 'تخضع هذه الشروط والأحكام لأنظمة المملكة العربية السعودية. أي نزاع ينشأ عن استخدام الموقع يخضع للاختصاص القضائي للمحاكم المختصة في مدينة الرياض.',
    },
    {
      title: '٨. تعديل الشروط',
      body: 'تحتفظ الشركة بحق تعديل هذه الشروط في أي وقت. سيُنشر تاريخ التعديل في أعلى هذه الصفحة، ويُعدّ استمرارك في استخدام الموقع بعد التعديل موافقةً على الشروط المُحدّثة.',
    },
    {
      title: '٩. التواصل',
      body: 'لأي استفسار بشأن هذه الشروط:\n• الهاتف: 920 033 262\n• الشركة: كيرا استيتس، الرياض، المملكة العربية السعودية',
    },
  ],
};

const enContent = {
  lang: 'en',
  dir: 'ltr',
  back: 'Back to Home',
  badge: 'Website Terms of Use',
  title: 'Terms & Conditions',
  effective: 'Effective Date: May 2026',
  intro: 'These Terms and Conditions govern your use of the Rafiah Villas website (the "Site") operated by Kira Estates (the "Company", "we"). By using the Site, you agree to be bound by these terms. If you do not agree, please do not use the Site.',
  sections: [
    {
      title: '1. Nature of Content',
      body: 'All information displayed on the Site, including prices, areas, availability status, floor plans, and images, is for general informational purposes only and does not constitute a binding or contractual offer.\n\nThe Company reserves the right to modify prices, specifications, and availability without prior notice. The executed contract between the parties is the sole and final reference.',
    },
    {
      title: '2. Registration of Interest',
      body: 'Registering your interest through the Site is an expression of your desire to receive additional information only. It does not create a reservation or a purchase obligation for either party.\n\nOur sales team will contact you during official business hours to discuss details.',
    },
    {
      title: '3. Intellectual Property',
      body: 'All content displayed on the Site, including text, images, designs, logos, and floor plans, is the property of Kira Estates and is protected under the intellectual property laws of the Kingdom of Saudi Arabia.\n\nCopying, reproducing, or distributing any content from the Site without prior written permission is prohibited.',
    },
    {
      title: '4. Accuracy of Information',
      body: 'The Company strives to ensure the accuracy of the information displayed, but does not guarantee that it is free from errors or up to date at all times.\n\nInformation is provided "as is" without any express or implied warranties regarding its completeness, accuracy, or fitness for a particular purpose.',
    },
    {
      title: '5. Limitation of Liability',
      body: 'The Company shall not be liable for any direct or indirect damages arising from the use of the Site or reliance on the information displayed therein.\n\nThe Company is not responsible for any interruption in Site service or any technical errors.',
    },
    {
      title: '6. External Links',
      body: 'The Site may contain links to external websites. The Company assumes no responsibility for the content or privacy policies of those websites.',
    },
    {
      title: '7. Governing Law',
      body: 'These Terms and Conditions are governed by the laws of the Kingdom of Saudi Arabia. Any dispute arising from the use of the Site shall be subject to the jurisdiction of the competent courts in the city of Riyadh.',
    },
    {
      title: '8. Amendment of Terms',
      body: 'The Company reserves the right to amend these terms at any time. The amendment date will be published at the top of this page, and your continued use of the Site after the amendment constitutes acceptance of the updated terms.',
    },
    {
      title: '9. Contact',
      body: 'For any enquiry regarding these terms:\n• Phone: 920 033 262\n• Company: Kira Estates, Riyadh, Kingdom of Saudi Arabia',
    },
  ],
};

export default async function TermsPage() {
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

        {/* Badge */}
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
