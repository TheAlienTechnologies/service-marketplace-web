# Service Marketplace Theme System

This document outlines the comprehensive theme system implemented for the Service Marketplace application.

## Overview

The theme system is built using:

- **Tailwind CSS v4** with `@theme` directive
- **CSS Custom Properties** for dynamic theming
- **React Context** for theme state management
- **Local Storage** for theme persistence

## Color Palette

### Brand Colors

Primary green color palette based on the provided design:

```css
--brand-50: #f0fdf4   /* Very light green */
--brand-100: #dcfce7  /* Light green */
--brand-200: #bbf7d0  /* Light green */
--brand-300: #86efac  /* Medium light green */
--brand-400: #4ade80  /* Medium green */
--brand-500: #22c55e  /* Primary green */
--brand-600: #16a34a  /* Medium dark green */
--brand-700: #15803d  /* Dark green */
--brand-800: #166534  /* Darker green */
--brand-900: #14532d  /* Very dark green */
--brand-950: #052e16  /* Darkest green */
```

### Marketplace Colors

Custom colors extracted from the provided images:

```css
--marketplace-50: #CFFCD8   /* Very light green */
--marketplace-100: #6AEC8E  /* Light green */
--marketplace-200: #55C173  /* Medium light green */
--marketplace-300: #419750  /* Medium green */
--marketplace-400: #2E6F40  /* Medium dark green */
--marketplace-500: #1C4A29  /* Dark green */
--marketplace-600: #0C2713  /* Darkest green */
```

### Status Colors

```css
--success: #22c55e    /* Green for success states */
--warning: #f59e0b    /* Amber for warning states */
--error: #ef4444      /* Red for error states */
--info: #3b82f6       /* Blue for info states */
```

## Theme Modes

### Light Theme

- Background: `#ffffff`
- Foreground: `#0f172a`
- Primary: `#22c55e`
- Secondary: `#f1f5f9`
- Muted: `#f8fafc`
- Border: `#e2e8f0`

### Dark Theme

- Background: `#0f172a`
- Foreground: `#f8fafc`
- Primary: `#4ade80`
- Secondary: `#334155`
- Muted: `#1e293b`
- Border: `#334155`

## Usage

### Theme Provider

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultTheme="light"
          storageKey="service-marketplace-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Using Theme Hook

```tsx
import { useTheme } from "@/components/theme-provider";

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Theme Toggle Component

```tsx
import { ThemeToggle } from "@/components/theme-toggle";

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

## Tailwind Classes

### Standard Theme Classes

- `bg-background` / `text-foreground`
- `bg-primary` / `text-primary-foreground`
- `bg-secondary` / `text-secondary-foreground`
- `bg-muted` / `text-muted-foreground`
- `bg-card` / `text-card-foreground`
- `border-border`
- `ring-ring`

### Custom Brand Classes

- `text-brand` / `bg-brand` / `border-brand`
- `text-marketplace` / `bg-marketplace` / `border-marketplace`

### Status Classes

- `text-success` / `bg-success`
- `text-warning` / `bg-warning`
- `text-info` / `bg-info`

### Gradient Classes

- `bg-gradient-brand` - Brand color gradient
- `bg-gradient-marketplace` - Marketplace color gradient

## Component Examples

### Primary Button

```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
  Primary Action
</button>
```

### Card Component

```tsx
<div className="bg-card border border-border rounded-lg p-6">
  <h3 className="text-card-foreground font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card description</p>
</div>
```

### Status Badge

```tsx
<span className="bg-success text-success-foreground px-2 py-1 rounded text-sm">
  Success
</span>
```

## File Structure

```
service-marketplace-web/
├── app/
│   ├── globals.css          # Theme definitions and Tailwind config
│   └── layout.tsx           # Theme provider setup
├── components/
│   ├── theme-provider.tsx   # Theme context and provider
│   └── theme-toggle.tsx     # Theme toggle component
├── lib/
│   └── theme.ts            # Theme constants and utilities
└── THEME.md                # This documentation
```

## Customization

### Adding New Colors

1. Add CSS custom properties to `:root` and `.dark` in `globals.css`
2. Add corresponding Tailwind color mappings in the `@theme` directive
3. Create utility classes if needed
4. Update the theme constants in `lib/theme.ts`

### Creating New Variants

1. Define new CSS custom properties
2. Add them to the `@theme` directive
3. Create utility classes in the `@layer utilities` section
4. Document the new variants

## Best Practices

1. **Use semantic color names** (primary, secondary, muted) instead of specific colors
2. **Test both light and dark themes** for all components
3. **Use CSS custom properties** for dynamic values
4. **Leverage the theme context** for theme-aware components
5. **Maintain contrast ratios** for accessibility
6. **Use the provided utility classes** for consistency

## Browser Support

The theme system uses modern CSS features:

- CSS Custom Properties (CSS Variables)
- CSS `@layer` directive
- Modern color functions

Supported browsers:

- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 16+
