# Vanguard Design & Agency Architecture Rules

### 1. Visual & Aesthetic Standards (WOW Factor)
- **Dark Void Atmosphere**: Default background is a deep obsidian void (`#060709` or `#08090d`), layered with subtle radial gradient mesh lights (electric indigo `#6366f1`, cyan `#06b6d4`, or mint emerald `#10b981`).
- **Glassmorphism & Depth**: Surfaces utilize frosted backdrop blur (`backdrop-blur-md` / `backdrop-blur-xl`) with ultra-fine borders (`rgba(255, 255, 255, 0.08)`).
- **Interactive Feedback**: All CTA buttons and key cards must have micro-interactions: subtle glow on hover, active press states, or magnetic cursor feel.
- **Modern Typography**: High contrast hierarchy using geometric sans-serif fonts (e.g., Plus Jakarta Sans, Outfit, Inter). Never default browser serif or unstyled text.

### 2. Modularity & Scalability
- **Config-Driven Service System**: Services and offerings are defined in `src/config/services.ts`. Never hardcode service lists across multiple components.
- **Atomic UI Components**: Keep primitives in `components/ui/` isolated and reusable.
- **Section Isolation**: Landing page sections (`Hero`, `ServicesBento`, `Metrics`, `ClientShowcase`, `ContactForm`) live in `components/sections/`.

### 3. Clean Next.js Patterns
- Server Components by default; Client Components (`'use client'`) only when state, event handlers, or browser APIs are required.
- Dynamic SEO metadata generated on every route.
