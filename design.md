# UI/UX Design Strategy: Rafiah Villas

This document outlines the product design architecture and UX strategy for Rafiah (رفيعة), developed by Kira Estates. 
The core objective is to move away from the traditional "brochure website" and instead deliver a **premium, availability-first villa finder** experience.

## 1. The New Experience Model
Rafiah is not a static landing page; it is a dynamic digital showroom. The experience model is a **Filter-First Discovery Engine**. Users arrive not to read marketing copy, but to immediately engage with live inventory, floor plans, and real-time availability. The interface acts like a high-end application rather than a website.

## 2. The Villa Finder Concept
- **Availability-First**: The hero section bypasses standard "Welcome" imagery and immediately presents the Finder interface (e.g., "3 Villas Available", "Filter by Plot Size").
- **Visual Grid**: Villas are displayed in an architectural bento grid or list view with stark, high-contrast imagery, status tags (Available, Reserved, Sold), and primary specs.
- **Interactive Map/Plot**: A lightweight interactive SVG or HTML masterplan first; WebGL is not allowed in v1. This replaces standard photo galleries.

## 3. The Lead Magnet Logic
- **High-Value Gating**: Do not gate pricing or floor plans in v1 unless the client specifically asks. Master plans remain open.
- **Premium Assets**: Gate the "Immersive VR Walkthrough", "Detailed Architectural Brochure", or "Private VIP Viewing Request" behind a low-friction capture form.
- **Progressive Disclosure**: Only ask for Phone/Email when the user has engaged with at least 3 villa profiles or requests a specific action.

## 4. The Buyer Journey
1. **Entry**: Immediate exposure to the Finder and Master Plan (No long narrative scrolls).
2. **Exploration**: Rapid filtering by status, size, or orientation. 
3. **Deep Dive**: Modal or Slide-over (Sheet) for individual villa details to maintain context without reloading pages.
4. **Action**: Persistent sticky "Register Interest" CTA tied specifically to the viewed unit.

## 5. The Visual Design Direction
- **Aesthetic**: *Editorial Minimalism* meets *Industrial Utility*. Brutally clean lines, generous negative space, and severe typography.
- **Typography**: A highly distinctive, architectural Sans-Serif pairing (e.g., Geist/Geist Mono or a Swiss modernist font). No system default fallbacks like Arial visually.
- **Color Palette**: 
  - **Royal Green (`#012a17`)**: Primary brand identity, used for key interactive elements, solid backgrounds on highlight sections, and strong typographic contrast.
  - **Black (`#050505`)**: Primary text, deep surface shadows, and borders.
  - **White (`#ffffff`)**: Dominant background, creating a stark, gallery-like canvas.

## 6. The Mobile UX Rules
- **Thumb-Zone Navigation**: All primary actions, filters, and CTAs must be anchored to the bottom third of the screen.
- **Bottom Sheets over Pages**: A mobile bottom sheet is preferred for villa details. Villa details open as swipeable bottom sheets (using Framer Motion) rather than pushing to a new URL, preserving the search state.
- **Touch Targets**: Absolute minimum `48x48px` for all interactive elements (filters, toggles, close buttons).
- **Horizontal Scroll**: Use smooth, snapping horizontal scroll rows for image galleries instead of tiny pagination dots.

## 7. The Interaction Rules
- **Snappy Physics**: Use spring physics for interactions. No slow, floaty linear animations. Transitions must complete in 150-300ms.
- **Hover/Active States**: Hover states (desktop) must be distinct (e.g., image zoom or hard shadow drop). Active/Pressed states (mobile) must provide immediate visual feedback (scale down `0.98`).
- **Skeleton Loaders**: Use structural skeleton layouts matching the exact dimensions of the content during data fetching from Sanity CMS to prevent Cumulative Layout Shift (CLS).

## 8. The Conversion Rules
- **Contextual Inquiry**: The inquiry form must always inherit the context. If the user clicks "Inquire" on Villa #04, the form auto-fills "Interested in Villa #04".
- **Single Primary CTA**: "Request Viewing" or "Register Interest". All other buttons (e.g., Download Brochure) are visually subordinate (outlined or ghost).
- **Sticky Persistence**: On mobile, the CTA is permanently sticky at the bottom edge above the safe area.

## 9. The CMS/Sanity Content Strategy
- **Structured Data, Not Rich Text**: Sanity will be modeled as an inventory system, not a blog. 
  - Schema: `Villa` (ID, Status, Price, Plot Size, BUA, Image Gallery, Floor Plan Ref).
  - Schema: `Global Settings` (Lead Magnet PDF, Contact Info, Hero Video URL).
- **Data Fetching Flow**: Build with real static fallback data first, then wire Sanity later. Sanity controls villa inventory/status, but UI must work before Sanity is connected.
- **Real-Time Illusion**: Content updates in Sanity should immediately reflect as "Status: Reserved" on the frontend using Next.js ISR/On-Demand Revalidation.

## 10. What NOT to Build
- **NO** generic full-screen auto-playing video heroes with standard "Discover Luxury" overlay text.
- **NO** "About Us" blocks or developer history sections interrupting the primary flow. Move "Kira Estates" branding to the footer or an "About" modal.
- **NO** scroll hijacking or smooth scrolling libraries that break native browser behavior.
- **NO** generic AI aesthetic (e.g., soft purple gradients, rounded bubbly buttons). Keep corners sharp (0-2px radius) and UI architectural.

## 11. Architecture Rules
- **Server Components**: Use Server Components by default; Client Components only for filters, drawers, forms, and motion.
