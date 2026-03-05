# Google Fonts Integration

## Added Fonts

The following Google Fonts have been added to the project:

### 1. **Manrope** (Weights: 200-800)
- Modern, clean sans-serif font
- Great for body text and UI elements
- Usage: `className="font-manrope"`

### 2. **Orbitron** (Weights: 400-900)
- Futuristic, tech-inspired display font
- Perfect for headings, logos, and accent text
- Usage: `className="font-orbitron"`

### 3. **Poppins** (Weights: 100-900, Italic: 100-900)
- Geometric sans-serif with friendly feel
- Versatile for both headings and body text
- Usage: `className="font-poppins"`

## How to Use

### In Components
```tsx
// Use the font classes directly
<p className="font-manrope text-lg">Text using Manrope</p>
<h1 className="font-orbitron text-4xl">Heading using Orbitron</h1>
<p className="font-poppins italic">Text using Poppins Italic</p>
```

### In CSS/Tailwind
```css
/* Use CSS variables */
.custom-class {
  font-family: var(--font-manrope);
}

/* Or use Tailwind arbitrary values */
<div class="[font-family:var(--font-poppins)]">
```

### Global Application
To apply a font globally, update `app/layout.tsx`:

```tsx
<body className="font-poppins">
```

## Font Weights

| Font | Available Weights |
|------|------------------|
| Manrope | 200, 300, 400, 500, 600, 700, 800 |
| Orbitron | 400, 500, 600, 700, 800, 900 |
| Poppins | 100, 200, 300, 400, 500, 600, 700, 800, 900 (all with italic) |

## Examples

```tsx
// Manrope for clean UI text
<div className="font-manrope font-medium text-gray-700">
  Clean, readable text
</div>

// Orbitron for futuristic headings
<h2 className="font-orbitron font-bold text-3xl">
  Future Tech
</h2>

// Poppins for friendly, approachable content
<p className="font-poppins font-normal italic">
  Warm, inviting text
</p>
```

## Files Modified

- `app/globals.css` - Font imports and CSS variables
- `app/layout.tsx` - Font variable declarations
