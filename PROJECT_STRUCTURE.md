# Service Marketplace Web - Project Structure

## 🏗️ Current Structure (Minimal for Incremental Development)

```
service-marketplace-web/
├── 📁 app/                          # Next.js 15 App Router
│   ├── 📁 (auth)/                   # Auth route group
│   │   ├── 📁 login/                # Login page
│   │   ├── 📁 register/             # Registration page
│   │   ├── 📁 forgot-password/      # Password reset
│   │   └── 📁 verify-email/         # Email verification
│   ├── globals.css                  # Global styles with theme
│   ├── layout.tsx                   # Root layout with theme provider
│   └── page.tsx                     # Home page
├── 📁 components/                   # Reusable UI components
│   ├── 📁 ui/                       # Base UI components (shadcn/ui)
│   ├── 📁 layout/                   # Layout components (Header, Footer, etc.)
│   ├── theme-provider.tsx           # Theme context provider
│   ├── theme-toggle.tsx             # Theme toggle component
│   └── theme-showcase.tsx           # Theme demonstration
├── 📁 lib/                          # Utility libraries
│   ├── 📁 auth/                     # Auth utilities (to be created)
│   ├── theme.ts                     # Theme configuration
│   └── utils.ts                     # General utilities
├── 📁 store/                        # Zustand state management
│   └── 📁 slices/                   # Store slices (to be created)
├── 📁 types/                        # TypeScript type definitions (to be created)
├── 📁 public/                       # Static assets
├── package.json                     # Dependencies
├── THEME.md                         # Theme documentation
└── PROJECT_STRUCTURE.md             # This file
```

## 🎯 Implementation Plan

### Phase 1: Authentication (Current Focus)

- [ ] Set up auth types and interfaces
- [ ] Create auth store with Zustand
- [ ] Build login/register forms
- [ ] Implement auth pages
- [ ] Connect to backend API

### Phase 2: Core Layout

- [ ] Create main navigation
- [ ] Build responsive header/footer
- [ ] Set up protected routes

### Phase 3: Service Browsing

- [ ] Add service types
- [ ] Create service listing pages
- [ ] Implement search functionality

### Phase 4: User Dashboards

- [ ] Customer dashboard
- [ ] Provider dashboard
- [ ] Admin dashboard

### Phase 5: Orders & Payments

- [ ] Order management
- [ ] Payment integration (Mobile Money, etc.)
- [ ] Ghanaian payment methods

## 🛠️ Technologies

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand
- **Server State**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Theme**: Custom theme system with light/dark modes
- **TypeScript**: Full type safety

## 📝 Notes

- Backend integration will be added incrementally
- Ghanaian-specific features (Mobile Money, local languages) will be added in later phases
- Structure will expand as features are implemented
- Focus on clean, maintainable code with proper TypeScript types
