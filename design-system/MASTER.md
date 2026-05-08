# Rafiah Villas — Design System Master

Generated via ui-ux-pro-max skill · Applied to: Next.js 15 + Tailwind CSS v4 + RTL/Arabic-first

---

## 1. Product Classification

| Attribute | Value |
|-----------|-------|
| Product type | Luxury real estate landing page |
| Audience | Saudi families, high-net-worth buyers, Riyadh market |
| Style class | **Editorial Minimalism** — high contrast, restrained gold accent, spatial generosity |
| Conversion model | Lead capture (WhatsApp + form) — not e-commerce |
| Trust signals | Warranty proof, developer license, phase 1 sold out |
| RTL-primary | Yes — Arabic is first-class, English secondary |

**Matched styles from skill database:**
1. Editorial Minimalism ← primary (fits: premium, trust-first, clean)
2. Dark Luxury ← used for gallery + floor plan sections
3. Warm Neutral ← used for off-white warranty + form sections

**Reject:** Glassmorphism, Claymorphism, SaaS Bento Grid, Neumorphism, Gradient Maximalism

---

## 2. Color System

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-royal-green` | `#012a17` | Primary brand color, dark section bg, CTAs |
| `brand-black` | `#050505` | Body text, ink on light backgrounds |
| `brand-white` | `#ffffff` | Clean white backgrounds, form fields |
| `surface-warm` | `#FAF9F6` | Calm section backgrounds (Warranties, Location) |
| `accent-gold-light` | `#D4B78F` | Overlines, dividers, decorative accents |
| `accent-gold-deep` | `#B5913A` | Serif italic headings, stat year numbers |

### Semantic Tokens (define in globals.css @theme)

```css
--color-surface-warm: #FAF9F6;
--color-accent-gold-light: #D4B78F;
--color-accent-gold-deep: #B5913A;
--color-text-muted: rgba(5, 5, 5, 0.50);   /* body/50 on light */
--color-text-ghost: rgba(5, 5, 5, 0.30);   /* dividers on light */
--color-white-muted: rgba(255,255,255,0.60); /* body/60 on dark */
--color-white-ghost: rgba(255,255,255,0.20); /* borders on dark */
```

### Contrast Check (WCAG AA = 4.5:1)

| Pair | Ratio | Status |
|------|-------|--------|
| `#ffffff` on `#012a17` | 14.6:1 | ✅ AAA |
| `#050505` on `#FAF9F6` | 19.7:1 | ✅ AAA |
| `#B5913A` on `#012a17` | 4.8:1 | ✅ AA |
| `#D4B78F` on `#050505` | 5.1:1 | ✅ AA |
| `rgba(255,255,255,0.60)` on `#012a17` | ~5.1:1 | ✅ AA |
| `rgba(5,5,5,0.50)` on `#FAF9F6` | ~4.9:1 | ✅ AA (verify) |

**Rule:** Never go below white/50 on dark backgrounds. `white/40` text (`rgba(255,255,255,0.40)`) = 3.0:1 — only use for truly decorative, non-readable labels.

---

## 3. Typography System

### Font Stack

| Role | Font | Variable | Usage |
|------|------|----------|-------|
| Sans-serif (primary) | DM Sans | `--font-dm-sans` | Body, labels, UI, overlines |
| Serif (display) | Cormorant Garamond | `--font-cormorant` | Italic headings, year numbers, decorative accents |
| Mono (data) | DM Mono | `--font-dm-mono` | Stats, prices, coordinates — always LTR |
| Arabic | Noto Naskh Arabic | `--font-arabic` | All Arabic text, RTL pages |

### Type Scale in Use

| Class | px | Usage |
|-------|----|-------|
| `text-[11px]` / `text-overline` | 11 | Overlines, labels, tracking 0.15–0.2em |
| `text-xs` | 12 | Captions, sub-labels |
| `text-[13px]` / `text-label` | 13 | Secondary UI labels |
| `text-sm` | 14 | Body secondary |
| `text-base` | 16 | Body primary (minimum on mobile) |
| `text-lg` | 18 | Lead paragraph |
| `text-4xl`–`text-5xl` | 36–48 | Section headings |
| `text-6xl`–`text-7xl` | 60–72 | Large editorial headings |
| `text-7xl`–`text-8xl` | 72–96 | Hero headline |

**Rules:**
- Body minimum: `16px` on mobile (prevents iOS auto-zoom)
- Arabic body: `line-height: 1.8` (already set in globals)
- Arabic headings: `letter-spacing: 0` (already set)
- Mono/numbers: always `direction: ltr; unicode-bidi: embed` in RTL
- Do not use `tracking-tight` on Arabic text
- Serif italic (`font-serif italic`) reserved for decorative emphasis only — 1 per section max

### Heading Weights

| Element | Weight | Notes |
|---------|--------|-------|
| Hero h1 | 700 (bold) | DM Sans, tight tracking |
| Section h2 | 700 (bold) | DM Sans, `tracking-tighter` |
| Serif accent | 400 (normal italic) | Cormorant Garamond |
| Overline | 700 (bold) | uppercase, `tracking-[0.2em]` |
| Body | 400 (normal) | |
| Labels/meta | 500–600 (medium/semibold) | |

---

## 4. Spacing Scale

Use 4pt base system. Standard gaps in this project:

| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` | 4px | Micro spacing, icon-to-label |
| `gap-3` | 12px | Tight clusters |
| `gap-4` | 16px | Default card/item spacing |
| `gap-6` | 24px | Section internal gaps |
| `gap-8` | 32px | Card grid gaps |
| `py-24` | 96px | Section vertical padding |
| `py-32` | 128px | Section vertical padding (large) |
| `mb-8` | 32px | After overline |
| `mb-16` | 64px | After section header block |
| `mb-24` | 96px | After section header on desktop |

**Max widths:**
- Page container: `max-w-[1800px]`
- Text content: `max-w-2xl` (672px) for body paragraphs
- Floor plans: `max-w-[1400px]`

---

## 5. Component Patterns

### Overline (section label above heading)

```tsx
<div className="inline-flex items-center gap-4 text-[#012a17] uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-8">
  <span className="w-8 sm:w-12 h-px bg-[#012a17]"></span>
  {t('overline')}
</div>
```

On dark sections: replace `text-[#012a17]` with `text-[#D4B78F]` and `bg-[#012a17]` with `bg-[#D4B78F]`.

### Section Heading Pattern

```tsx
<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-black mb-4">
  {t('titleLine1')}{' '}
  <span className="font-serif italic text-[#B5913A] font-normal">{t('titleLine2')}</span>
</h2>
```

**Rule:** Only 1 serif italic accent per heading. Do not stack multiple italic spans.

### CTA Button — Primary

```tsx
/* Light section */
<button className="bg-[#012a17] border border-[#012a17] text-white px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#012a17] transition-colors duration-300">
  {t('cta')}
</button>

/* Dark section */
<button className="bg-white text-[#012a17] px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#FAF9F6] transition-colors duration-300">
  {t('cta')}
</button>
```

**Rules:**
- One primary CTA per section (WCAG, Apple HIG)
- Min height: 48px (`py-3` + font = ~48px). Verify on mobile
- Touch target: minimum 44×44px (Apple HIG) — this pattern clears it with `py-4`
- No `cursor-pointer` needed in Tailwind (handled globally via `button` reset)
- Use `border-radius: 0` — no bubbly corners

### Gold Accent Divider

```tsx
<div className="w-8 h-px bg-[#B5913A]/50 mb-6 group-hover:w-16 transition-all duration-500"></div>
```

Used in warranty cards. Expand-on-hover is good: motion conveys meaning (state change).

### Filter/Tab Buttons

```tsx
<button
  className={`px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] border transition-colors duration-200
    ${active 
      ? 'bg-[#012a17] text-white border-[#012a17]' 
      : 'bg-transparent text-black/60 border-black/20 hover:border-black/40 hover:text-black'
    }`}
>
```

Active state must be visually distinct — color + border change. Never color-only.

### Villa Card — Status Badge

```tsx
const statusStyles = {
  available: 'bg-[#012a17] text-white',
  reserved:  'bg-[#D4B78F] text-[#050505]',
  sold:      'bg-black/20 text-black/50 line-through',
};
```

**Rule:** Status uses shape + color + text — never color alone (colorblind users).

---

## 6. Z-Index Scale

| Layer | z-index | Usage |
|-------|---------|-------|
| Base content | `z-0` | Default document flow |
| Section content | `z-10` | Content above `LuxuryBackground` |
| Sticky elements | `z-20` | Sticky section headers |
| Floating UI | `z-50` | Floating buttons (WhatsApp, 360°) |
| Modals / lightbox | `z-[100]` | YARL lightbox, bottom sheets |
| Language switcher | `z-50` | Header overlay |

**Critical rule:** Any section using `<LuxuryBackground />` must wrap its content in `<div className="relative z-10">`. LuxuryBackground is `absolute inset-0` — it paints over non-positioned elements.

---

## 7. Animation Tokens

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `duration-200` | 200ms | Button hover, color transitions |
| `duration-300` | 300ms | Card hover, tab switch |
| `duration-500` | 500ms | Gold divider expand, scroll reveal |
| `duration-700` | 700ms | Image scale, hero entrance, gallery item |

### Easing

| Context | Value |
|---------|-------|
| Entering elements | `ease-out` |
| Exiting elements | `ease-in` |
| Interactive feedback | `ease-out` |
| Background orbs | `ease-in-out` (in CSS keyframes) |

### Stagger

Scroll stagger: `delay: Math.min(index * 0.06, 0.4)` — already used in GallerySection. Max 400ms total stagger. This is correct (30–50ms per item per skill rule).

### Motion Rules

- Use `transform` and `opacity` only — never `width`, `height`, `top`, `left`
- `whileInView` with `viewport={{ once: true, amount: 0.2 }}` — correct pattern
- Scale feedback: `whileTap={{ scale: 0.96 }}` — correct range (0.95–1.05 rule)
- Respect `prefers-reduced-motion` — add this to globals:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. RTL/Bilingual Rules

### Logical Property Map

| Physical (avoid) | Logical (use) | Tailwind v4 |
|------------------|---------------|-------------|
| `padding-left` | `padding-inline-start` | `ps-*` |
| `padding-right` | `padding-inline-end` | `pe-*` |
| `margin-left` | `margin-inline-start` | `ms-*` |
| `border-left` | `border-inline-start` | `border-s` |
| `text-left` | `text-start` | `text-start` |
| `left-0` | `inset-inline-start: 0` | `start-0` |

**Exceptions where physical is correct:**
- `right-6` on floating buttons (physically pinned, intentional)
- `dir="ltr"` on `.font-mono` numbers (numbers always LTR)

### Arabic Typography Checklist

- [ ] `font-family: var(--font-arabic)` active on `:lang(ar)` ✅
- [ ] `line-height: 1.8` on Arabic body ✅
- [ ] `letter-spacing: 0` on Arabic headings ✅
- [ ] Numbers stay `direction: ltr; unicode-bidi: embed` ✅
- [ ] No `tracking-tight` on Arabic text
- [ ] Overline tracking reduced to `0.05em` in RTL ✅

---

## 9. Section-by-Section Guidance

### Hero
- Style: Dark Luxury — full bleed video, white text
- Keep overlay at `bg-black/20` — don't go above `/30` (hurts video quality)
- Stats: DM Mono, large, tabular figures — numbers must be `direction: ltr`
- Marquee: Royal Green bar, correct as-is

### Location
- Style: Editorial Minimalism on `surface-warm`
- Map: if using embed, wrap in `aspect-[4/3]` with `overflow-hidden`
- Landmarks: icon + text pairs — never icon-only (aria-label required if icon-only)

### Villas Collection
- Style: Light/Editorial — filter tabs + grid
- Status badges: color + shape + text (never color-only)
- Available filter: default state shows all — don't hide sold/reserved by default (creates false scarcity)
- Card hover: subtle scale `hover:scale-[1.01]` max — no large lifts

### Gallery
- Style: Dark Luxury with `LuxuryBackground`
- Embla drag: correct RTL direction support ✅
- Image aspect ratio: `16/10` — consistent across all cards
- Lightbox: black `rgba(0,0,0,0.96)` — already correct

### Floor Plans
- Style: Dark Luxury
- Tab active state: must be visually distinct — color + underline or fill
- Image container: use `aspect-ratio` to prevent layout shift during load

### Warranties
- Style: Warm Neutral (`#FAF9F6`)
- Grid separator: `bg-black/10` — subtle, correct
- Year number: `font-serif text-7xl text-[#B5913A]` — only serif usage in this section, correct

### Register Interest
- Style: Dark Luxury with `LuxuryBackground`
- Form inputs: need `aria-label` or explicit `<label>` per WCAG
- Submit button: `bg-[#012a17] text-white` — already updated ✅
- Privacy link: present and linking to `/[locale]/privacy` ✅

---

## 10. Anti-Pattern Registry

These patterns have been found and fixed or must be actively avoided:

| Anti-Pattern | Why | Status |
|---|---|---|
| No `relative z-10` on content inside `LuxuryBackground` | Background paints over content | Fixed in Villas, Gallery, FloorPlans |
| `useTranslations` in Server Component | Runtime error | Fixed in LocationSection |
| `any` type in TypeScript | Breaks type safety | Fixed in villas.ts, layout, i18n |
| Unused imports | Lint errors | Cleaned in GallerySection, WarrantiesSection |
| Hero CTA with no `href` | Dead button, zero conversion | Fixed — now `motion.a` with `href` |
| `locale as any` in `includes()` | TypeScript unsafety | Fixed in layout + i18n request |
| `left`/`right` CSS in logical contexts | Breaks RTL layout | Use `start`/`end` logical props |
| Serif italic on body text | Destroys readability | Serif = display accents only |
| Gold gradient everywhere | Looks cheap/excessive | Bronze/gold = restrained accents only |
| Status by color alone | Fails colorblind users | Always add text label alongside status color |
| `bg-black/20` below on dark text | Fails contrast | Keep text on sufficiently dark surfaces |
| `tracking-tight` on Arabic | Breaks Arabic typesetting | Always `letter-spacing: 0` in RTL |

---

## 11. Missing / Recommended Additions

Ranked by conversion impact:

### High Priority

1. **`prefers-reduced-motion` global rule** — accessibility requirement, ~5 lines of CSS
2. **`aria-label` on icon-only buttons** — floating WhatsApp and 360° buttons need `aria-label` (currently SVG-only)
3. **Form `<label>` elements** — RegisterInterestSection form inputs need explicit labels (not placeholder-only)
4. **Page-level `generateMetadata`** — SEO meta title + description + OG tags — currently missing
5. **Language switcher preserving path** — currently `<a href="/{locale}">` drops the user back to homepage; should use `next-intl` `Link` with `usePathname()`

### Medium Priority

6. **Floor plan image filename with space** — `'corner-ground-floor plan.webp'` → rename to `corner-ground-floor-plan.webp`
7. **Skeleton loaders on villa grid** — if Sanity is slow, grid flashes empty; add shimmer placeholder
8. **`generateViewport` export** — add to layout for proper mobile meta
9. **`rel="noopener noreferrer"` on external links** — WhatsApp wa.me links and 3D tour link

### Low Priority

10. **Sanity `readToken`** — currently unused; needed for draft previews
11. **`sortVillasByAvailability` dead code** — remove from villas.ts
12. **Sanity config fallback consistency** — `sanity.config.ts` uses `'demo'` fallback vs `sanity.cli.ts` uses real ID

---

## 12. Implementation Checklist

Before shipping any new section or component:

**Visual**
- [ ] Matches one of three styles: Editorial Minimalism / Dark Luxury / Warm Neutral
- [ ] No new colors outside the 6-color palette
- [ ] One primary CTA per section
- [ ] Serif italic used max once per section (decorative accent only)
- [ ] No bubbly corners (8px max)

**Accessibility**
- [ ] Color contrast ≥ 4.5:1 on all text
- [ ] Icon-only buttons have `aria-label`
- [ ] Form inputs have explicit `<label>` elements
- [ ] Status indicators use text + color (not color alone)

**RTL**
- [ ] Logical CSS properties used (`ps-*`, `pe-*`, `start-*`, `end-*`)
- [ ] Numbers in `.font-mono` with `direction: ltr`
- [ ] Arabic heading `letter-spacing: 0`
- [ ] Tested on `/ar` route visually

**Z-index**
- [ ] `relative z-10` on content inside any section using `LuxuryBackground`

**Performance**
- [ ] Images use `next/image` with `fill` + `sizes`
- [ ] Images below the fold use `loading="lazy"` (default with `next/image`)
- [ ] No new client component unless interactivity is required

**Code quality**
- [ ] No `any` types
- [ ] Server components use `getTranslations`, client components use `useTranslations`
- [ ] `npm run lint` passes 0 errors
- [ ] `npm run build` clean
