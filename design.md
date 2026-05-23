---
name: Rafiah Villas
description: Premium, availability-first villa finder experience.
colors:
  royal-green: "#012a17"
  gold: "#d4b78f"
  gold-dark: "#b5913a"
  neutral-bg: "#fcfdfc"
  neutral-surface: "#faf9f6"
  neutral-text: "#030f09"
typography:
  display:
    fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-dm-mono), ui-monospace, monospace"
    fontWeight: 700
    letterSpacing: "0.2em"
rounded:
  none: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.neutral-text}"
    padding: "16px 32px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.royal-green}"
---

# Design System: Rafiah Villas

## 1. Overview

**Creative North Star: "The Architectural Gallery"**

This system is built to feel confident, severe, and strictly utilitarian. It rejects the flowery marketing fluff typical of real estate in favor of a brutalist, filter-first digital showroom. The experience is engineered to present data and availability with absolute clarity. The aesthetic relies heavily on high contrast, stark typography, and deliberate negative space, rejecting any generic SaaS styling or auto-playing full-screen marketing videos.

**Key Characteristics:**
- High contrast, severe lines
- Tactile, snappy motion
- Absolute clarity and data-first presentation
- No decorative fluff

## 2. Colors

The palette is highly restrained, leaning on tinted neutrals with sharp, deliberate accents.

### Primary
- **Royal Green** (#012a17): The dominant brand anchor. Used for deep solid backgrounds on highlight sections and strong typographic contrast.
- **Sand Gold** (#d4b78f): Primary interactive accent for buttons, borders, and active states.

### Secondary
- **Dark Gold** (#b5913a): Used exclusively for deeper contrast within gold-themed components (e.g., warranty section accents).

### Neutral
- **Gallery White** (#fcfdfc): The dominant background, lightly tinted green to avoid harsh pure white.
- **Deep Slate** (#030f09): Primary text and deep surface shadows.
- **Off-White Surface** (#faf9f6): Used for secondary cards and subtle background differentiation.

**The Restraint Rule.** The primary gold accent is used sparingly. Its rarity guarantees it draws the eye to critical CTAs.

## 3. Typography

**Display Font:** DM Sans (with system sans fallback)
**Body Font:** DM Sans (with system sans fallback)
**Label/Mono Font:** DM Mono (with system monospace fallback)

**Character:** Highly distinctive and architectural. The pairing relies on stark structural contrast between the geometric sans and the data-heavy monospace.

### Hierarchy
- **Display** (700, 48-96px, 1.15): Hero section and section titles.
- **Headline** (700, 24-36px, 1.15): Villa card titles and modal headers.
- **Body** (400, 16px, 1.6): Paragraph text and descriptions. Max line length capped around 65-75ch.
- **Label** (700, 11px, 0.2em, uppercase): Used for tags, microcopy, and UI actions.

**The Label Rule.** All system metadata (availability tags, prices, structural dimensions) strictly use the Mono font to emphasize their nature as raw data.

## 4. Elevation

The system uses hybrid flat and layered techniques, maintaining an overall severe aesthetic but introducing deep ambient shadows to lift interactive elements.

### Shadow Vocabulary
- **Interactive Lift** (`box-shadow: 0 10px 30px -10px rgba(0,0,0,0.6)`): Used to lift sticky elements like the navigation and filter bar above the content plane.
- **Tactile Depress**: On active/click states, elements physically depress (`scale: 0.98`) rather than dropping shadows.

**The Flat-By-Default Rule.** Surfaces are stark and flat at rest. Depth is strictly reserved for fixed structural components and active interaction feedback.

## 5. Components

Components are tactile and confident, employing zero border radius to maintain architectural severity.

### Buttons
- **Shape:** Brutal sharp corners (0px radius).
- **Primary:** Gold background with deep slate text. Generous padding (`16px 32px`).
- **Hover / Focus:** Reverses to a white background with Royal Green text.
- **Active State:** Physically depresses by scaling down to `0.98`.

### Cards / Containers
- **Corner Style:** Sharp 0px radius.
- **Background:** Deep tinted transparent blacks or solid Royal Green.
- **Border:** 1px harsh borders (e.g., `border-white/10`).
- **Interaction:** Hovering reveals a stronger gold border and deepens the background opacity.

### Forms / Inputs
- **Style:** Severe bounding boxes with transparent or 10% opacity white backgrounds.
- **Focus:** Solid gold border shift.

## 6. Do's and Don'ts

### Do:
- **Do** rely heavily on DM Mono for all data points and metadata.
- **Do** ensure every interactive element depresses (`scale: 0.98`) on active states.
- **Do** cap body text line length around 65-75 characters.

### Don't:
- **Don't** use generic full-screen auto-playing video heroes with "Discover Luxury" overlay text.

> **Note on hero video:** The current implementation uses a muted, looping atmospheric video as a background texture beneath the poster image and bold typography overlay. This diverges from the strict "no video hero" rule — the video is intentionally subtle (low contrast, muted, no audio, poster image prioritized for LCP) and the text overlay is architectural and brand-specific, not generic real-estate copy. Considered an acceptable trade-off for visual depth, but remove if it begins to feel like a generic luxury template.
- **Don't** use "About Us" blocks or developer history sections that interrupt the primary discovery flow.
- **Don't** use soft purple gradients or generic AI-style bubbly aesthetics.
- **Don't** use identical, infinitely repeating card grids without structural variation.
- **Don't** use glassmorphism as a default decorative treatment.
