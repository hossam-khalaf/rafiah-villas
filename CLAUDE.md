# CLAUDE.md — Rafiah Villas Landing Page

## 1. Project Identity

Project: Rafiah Villas / فلل رفيعة  
Website: rafiahvilla.com  
Market: Riyadh, Saudi Arabia  
Language strategy: Arabic-first, with English version available  
Primary goal: Build a fresh, modern, high-converting villa landing page.

This is not a generic brochure website.

The page should feel like a premium, availability-first villa discovery experience for Saudi families looking for private, trustworthy, high-quality villas in Riyadh.

Core positioning:

> Rafiah Phase 2 is a limited second-phase villa project in Riyadh, built around privacy, family comfort, strong trust signals, and clear unit discovery.

Important business facts:
- Project: Rafiah Phase 2
- Location: Al Rafiah, Riyadh
- Developer: Kira Estates
- Phase 1 sold out
- Phase 2 has 22 villas
- Warranties up to 20 years
- Main CTA: سجل اهتمامك
- Contact phone: 920033262
- License number: 7200762744

Never invent project facts, prices, distances, unit counts, or availability. Use placeholders when the exact data is missing.

---

## 2. Technology Stack

Use this stack unless specifically told otherwise:

- Next.js App Router (v16) with TypeScript
- Tailwind CSS v4
- Sanity CMS for editable villa data, availability, SEO, and page content
- Motion (Framer Motion v12) for subtle animation
- next-intl v4 for i18n
- Arabic default route: `/ar`
- English route: `/en`

Arabic is the primary experience. English is secondary.

The site must be RTL-aware from the start.

---

## 3. Conversion Goal

The main goal is to make qualified visitors contact the sales team.

Primary conversion actions:
- WhatsApp inquiry (wa.me/966920033262)
- Phone call (920033262)
- Lead form submission
- Villa-specific inquiry

Every section should answer one of these questions:

1. What is this project?
2. Why should I trust it?
3. Is it suitable for my family?
4. What villas are available?
5. What are the plans/specs?
6. How do I contact sales now?

Avoid decorative sections that do not help conversion.

---

## 4. Design Direction

Visual direction:

- Premium Saudi family villa project
- Modern, clean, editorial, high contrast
- Trustworthy, not flashy
- Private family luxury, not hotel luxury
- Availability-first, not brochure-first

Preferred palette:

- Royal Green: `#012a17`
- Black / Ink: `#050505`
- White: `#ffffff`
- Warm off-white / soft beige (`#FAF9F6`) for calm sections
- Bronze / muted gold (`#D4B78F`, `#B5913A`) as restrained accent only

Do not introduce random colors.

Avoid:
- Bubbly SaaS design
- Cartoonish rounded cards
- Generic real-estate template look
- Overly dark luxury style
- Excessive gold gradients
- Random animations
- Scroll hijacking
- Fake urgency
- Crowded sections

Border radius:
- Prefer sharp or lightly softened geometry
- Use 0px–8px most of the time
- Do not use large bubbly 24px+ corners unless specifically approved

---

## 5. Layout Philosophy

The page should feel like a premium villa finder.

Prioritize:
- Large visual hero
- Clear availability signals
- Villa cards
- Floor-plan discovery
- Strong WhatsApp/call access
- Trust and warranty proof
- Mobile-first lead capture

Current section order (already built):

1. Hero (video background, stats bar, marquee ticker)
2. Location (map + landmarks)
3. Villas Collection (filterable grid: North / South / Corner)
4. Gallery (Embla carousel + lightbox)
5. Floor Plans (tabbed: Corner / Façade × Ground / Floor 1 / Floor 2)
6. Warranties (20-year warranty grid)
7. Register Interest (lead form + sales hotline)

Do not build all sections blindly. Build one section at a time.

---

## 6. Hero Section Rules

The hero is the most important section.

The hero must communicate within 5 seconds:

- This is Rafiah Phase 2
- It is in Riyadh
- Villas are limited
- Phase 1 sold out
- Visitor should inquire now

Hero includes:
- Full-screen video background (`/videos/rafiah-hero.mp4`)
- Poster fallback (`/images/rafiah-hero-poster.jpg`)
- Language switcher (top-right, physical position)
- Staggered animated headline via `HeroStagger` + `HeroFadeIn`
- 4 live stats (total villas, starting area, starting price, phase sold %)
- Hero CTA that scrolls to `#register-interest`
- Marquee ticker at bottom (Royal Green bar)

Do not add more than 2 hero CTAs.

---

## 7. Component Rules

Existing components:

- `HeroSection` → `src/app/[locale]/page.tsx` + `RafiahHeroMotion.tsx`
- `LocationSection` → server component, uses `getTranslations`
- `VillasSection` + `VillasGrid` → server + client split
- `GallerySection` → client component (Embla + YARL)
- `FloorPlansSection` → client component
- `WarrantiesSection` → client component
- `RegisterInterestSection` → client component (form + Sanity lead)
- `LuxuryBackground` → animated orb backdrop for dark sections
- `ScrollMotion` → `ScrollStagger`, `ScrollFadeIn`, `ScrollScaleIn`
- `Preloader` → full-screen loading screen
- `FloatingButtons` → fixed WhatsApp + 360° tour buttons

Component rules:
- Keep server components by default.
- Use client components only when interactivity is required (`'use client'`).
- Server components use `getTranslations()` from `next-intl/server`.
- Client components use `useTranslations()` from `next-intl`.
- Do not turn the whole page into a client component.
- Keep animation wrappers isolated.
- **Always add `relative z-10` to content wrappers inside sections that use `LuxuryBackground`.**
  `LuxuryBackground` is `absolute inset-0` and paints on top of non-positioned elements.
  `RegisterInterestSection` is the reference — it does this correctly.
- Do not let `LuxuryBackground` block clicks or overlay content.

---

## 8. RTL and Bilingual Rules

Arabic must be first-class, not an afterthought.

Rules:
- `/ar` uses `lang="ar"` and `dir="rtl"`
- `/en` uses `lang="en"` and `dir="ltr"`
- Use CSS logical properties where possible:
  - `padding-inline`, `margin-inline`
  - `inset-inline-start`, `inset-inline-end`
  - `ps-*`, `pe-*`, `ms-*`, `me-*`, `border-s`, `border-e` (Tailwind v4 logical)
  - `text-start`, `text-end`
- Do not hardcode `left` and `right` unless for physically fixed UI (e.g. floating buttons).
- Mirror directional icons in RTL where needed.
- Arabic typography: Noto Naskh Arabic (`--font-arabic`), `line-height: 1.8`, no letter-spacing.
- Headings in RTL reset `letter-spacing: 0`.
- Numbers and mono text stay LTR even in RTL pages (`direction: ltr; unicode-bidi: embed`).

Arabic tone:
- Confident, clear, Saudi-market appropriate
- Premium but not exaggerated
- Avoid empty phrases like "حياة فاخرة لا مثيل لها" unless supported by specifics

---

## 9. Mobile UX Rules

Mobile is critical.

Rules:
- CTA must be thumb-friendly.
- Minimum touch target: 48px height.
- Floating WhatsApp + 360° buttons are fixed `bottom-6 right-6` (physical).
- Do not hide critical project information on mobile.
- Villa cards must be readable without zooming.
- Avoid horizontal overflow.
- Avoid tiny text over images.
- Use bottom sheets for villa details when appropriate.
- Gallery: Embla horizontal scroll, smooth snapping.

Preferred mobile interaction:
- Villa card → opens bottom sheet with details, plan, CTA.
- Floating contact buttons always visible.
- Gallery swipes smoothly.

---

## 10. Animation Rules

Use Motion / Framer Motion carefully.

Animation should make the site feel premium, not noisy.

Allowed:
- Soft fade-up (`ScrollFadeIn`)
- Subtle image reveal (`HeroImageScale`)
- Small stagger on cards (`ScrollStagger`, `HeroStagger`)
- Bottom sheet animation
- Smooth CTA entrance
- Gentle background orb motion (`LuxuryBackground` CSS keyframes)

Avoid:
- Scroll hijacking
- Overanimated text
- Large parallax that hurts mobile performance
- Constant floating elements
- Animating every section identically
- Delays that slow conversion

Animations must respect performance and accessibility.

---

## 11. Villa Data Rules

Villa data comes from `src/data/villas.ts` (static fallback) with Sanity overlay via `src/lib/content/villas.ts`.

Villa fields:
- `id` — villa code (e.g. C1, D4)
- `type` — `'corner' | 'northFacade' | 'southFacade'`
- `status` — `'available' | 'reserved' | 'sold'`
- `plotSize` — area in m²
- `price` — price in SAR

Current inventory: 22 villas (4 corner, 9 north, 9 south).

Arabic status labels:
- available: متاح
- reserved: محجوز
- sold: مباع

Never fake availability. Never invent prices.

---

## 12. Sanity Rules

Sanity controls villa inventory, status, and site settings.

Current schemas:
- `villa` — inventory, status, price, area, type
- `siteSettings` — global site config

Planned schemas:
- `pageContent` — hero copy, section text
- `faq` — FAQ items
- `galleryImage` — gallery images

Sanity client: `src/sanity/lib/client.ts`  
Queries: `src/sanity/lib/queries.ts`  
Project ID: set via `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`  
Dataset: `production`

Both `sanity.config.ts` and `sanity.cli.ts` must use the same fallback project ID.

Keep schemas simple and practical.

---

## 13. Performance Rules

Rules:
- Use `next/image` for all images.
- Video backgrounds: compressed MP4, always provide poster, muted + autoPlay + playsInline.
- Avoid large animation libraries beyond Motion.
- Keep client components limited.
- Lazy-load below-the-fold heavy media.
- Use Tailwind utility classes — no runtime CSS-in-JS.

---

## 14. Privacy & Legal

Saudi market compliance:
- Privacy Policy page at `/[locale]/privacy` — PDPL compliant (Royal Decree M/19).
- Form privacy note links to `/privacy`.
- Real estate developer license: #7200762744
- Data retention: 36 months max.

---

## 15. Coding Style

Use:
- TypeScript — no `any`, use proper types
- Tailwind utilities
- Clear component names
- Small reusable components
- Data-driven rendering
- Clean props

Avoid:
- Huge single-file pages
- Inline random hex values (use design tokens / existing palette)
- Repeated markup
- Magic numbers
- Unnecessary dependencies
- Overengineering

---

## 16. Work Method

For every task:

1. Read this `CLAUDE.md`.
2. Identify the exact component or section being changed.
3. Make the smallest useful change.
4. Preserve RTL behavior.
5. Preserve mobile conversion.
6. Avoid unrelated redesigns.
7. Run `npm run lint` and `npm run build` before committing.

When asked to build a section:
- Build only that section unless told otherwise.
- Use placeholder content only when real content is missing.
- Do not invent real prices, distances, availability, or legal claims.
- Make it production-quality, not a rough demo.

When asked to review UI:
- Check conversion clarity.
- Check mobile layout.
- Check Arabic readability.
- Check visual hierarchy.
- Check CTA visibility.
- Check spacing and alignment.
- Check whether the design feels premium or template-like.

---

## 17. Hard No List

Do not:
- Create a generic real estate template
- Use bubbly SaaS cards
- Add random pastel colors
- Add fake statistics
- Add fake testimonials
- Add fake villa prices or distances
- Hide CTA until the bottom
- Use excessive scroll effects
- Make everything a client component
- Break RTL
- Use weak Arabic filler copy
- Add sections that do not support conversion
- Use `any` types in TypeScript
- Use `useTranslations` in Server Components (use `getTranslations` instead)
- Forget `relative z-10` on content inside dark sections

---

## 18. Quality Checklist

Before finalizing any change, verify:

- [ ] Does the section help conversion?
- [ ] Is the CTA visible on mobile?
- [ ] Does it work in Arabic RTL?
- [ ] Is mobile layout clean?
- [ ] Is visual hierarchy clear?
- [ ] Are project facts accurate (no invented data)?
- [ ] Are placeholders clearly marked?
- [ ] Is the design modern and premium?
- [ ] No fake urgency or unsupported claims?
- [ ] No unnecessary client-side JS?
- [ ] `relative z-10` on content above `LuxuryBackground`?
- [ ] `npm run lint` passes with 0 errors?
- [ ] `npm run build` passes cleanly?
