# Modern & Classy UI Theme – Implementation Guide

This document defines the **complete design system and implementation plan** for your updated homepage theme. It is tailored specifically for **Next.js + TypeScript + Tailwind CSS + Framer Motion** and can be reused across the entire website for consistency.

---

## 1. Design Goals

- Modern, premium, healthcare-grade UI
- Clean and airy layout with subtle colors
- Soft gradients instead of flat colors
- Clear visual hierarchy
- Motion that feels **smooth, purposeful, and minimal**
- Scales well for dashboards and data-heavy pages

---

## 2. Color Scheme (Core of the Theme)

### 2.1 Primary Palette

| Purpose | Color | Tailwind Variable |
|------|------|------------------|
| Primary Navy | `#0F2544` | `--primary` |
| Accent Orange | `#F97316` | `--accent` |
| Soft Blue | `#EAF2FF` | `--soft-blue` |
| Soft Mint | `#ECFDF5` | `--soft-mint` |
| Soft Peach | `#FFF4EC` | `--soft-peach` |

### 2.2 Neutral Colors

| Purpose | Color |
|------|------|
| Text Primary | `#0B1F33` |
| Text Secondary | `#5B6B7A` |
| Border | `#E5EAF0` |
| White | `#FFFFFF` |

---

## 3. Tailwind Theme Setup

### tailwind.config.ts

```ts
extend: {
  colors: {
    primary: '#0F2544',
    accent: '#F97316',
    softBlue: '#EAF2FF',
    softMint: '#ECFDF5',
    softPeach: '#FFF4EC',
    textPrimary: '#0B1F33',
    textSecondary: '#5B6B7A',
    borderLight: '#E5EAF0',
  },
  boxShadow: {
    card: '0 10px 30px rgba(15, 37, 68, 0.08)',
    soft: '0 4px 12px rgba(15, 37, 68, 0.06)',
  },
  borderRadius: {
    xl: '16px',
    '2xl': '20px',
  }
}
```

---

## 4. Layout & Spacing System

### Container

- Max width: `max-w-7xl`
- Horizontal padding: `px-6 lg:px-8`

### Vertical Rhythm

- Section spacing: `py-24`
- Card spacing: `gap-8`

---

## 5. Navbar Design

### Structure

- Sticky navbar
- Gradient background
- Slight blur

### Styles

```tsx
bg-gradient-to-r from-primary to-[#1E3A8A]
backdrop-blur-md
shadow-soft
```

### Active Link

- Accent underline
- Smooth width animation

---

## 6. Hero Section (Main Body Background)

### Background

```tsx
bg-gradient-to-br from-softBlue via-white to-softPeach
```

### Heading

- Font size: `text-5xl lg:text-6xl`
- Weight: `font-bold`

### Accent Text

```tsx
text-accent
```

---

## 7. Search Bar Design

- Floating style
- Rounded pill shape
- Soft shadow

```tsx
rounded-full
shadow-soft
bg-white
border border-borderLight
```

---

## 8. Card System (Feature Cards)

### Card Base

```tsx
bg-white
rounded-2xl
shadow-card
p-8
transition-all duration-300
```

### Card Hover

```tsx
hover:-translate-y-2
hover:shadow-xl
```

### Card Background Accent

| Card | Background |
|----|----|
| Product | `bg-softBlue` |
| Logistics | `bg-softMint` |
| Compliance | `bg-softPeach` |

---

## 9. Typography Rules

### Font Recommendation

- **Primary**: Inter / Geist / SF Pro

### Text Sizes

| Usage | Class |
|----|----|
| H1 | `text-6xl font-bold` |
| H2 | `text-4xl font-semibold` |
| Body | `text-base text-textSecondary` |
| Small | `text-sm text-textSecondary` |

---

## 10. Framer Motion – Animation System

### Global Rules

- Duration: `0.4 – 0.6s`
- Ease: `easeOut`
- Never bounce

---

### 10.1 Page Load Animation

```ts
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

---

### 10.2 Navbar Items

```ts
whileHover={{ y: -2 }}
transition={{ type: 'spring', stiffness: 200 }}
```

---

### 10.3 Card Hover Animation

```ts
whileHover={{ scale: 1.03 }}
```

---

### 10.4 Staggered Card Entrance

```ts
variants={{
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 }
  })
}}
```

---

## 11. Buttons

### Primary Button

```tsx
bg-accent text-white
rounded-full px-6 py-3
shadow-soft hover:shadow-lg
```

### Secondary Button

```tsx
border border-primary text-primary
rounded-full px-6 py-3
```

---

## 12. Accessibility & UX

- Contrast ratio ≥ 4.5
- Focus rings enabled
- Motion reduced for `prefers-reduced-motion`

---

## 13. How to Apply Across Pages

- Use same gradient logic for all hero sections
- Cards and tables share same shadow + radius
- Accent color used **sparingly** (CTAs only)
- No harsh borders — rely on spacing and shadows

---

## 14. Final Notes

This theme is designed to:

- Feel **enterprise-grade**
- Be easy to scale into dashboards
- Look modern for at least 3–5 years

You can now confidently redesign all pages using this document as your **single source of truth**.

If you want next:
- Dark mode version
- Dashboard theme
- Component-by-component Tailwind snippets

Just tell me 👍

