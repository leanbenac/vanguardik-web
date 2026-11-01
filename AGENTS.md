<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Development, Architecture & Security Guidelines

Welcome to the development guidelines for **Vanguardik** (Leandro Benac & Facundo Rodriguez Sabia's Software, Extensions & Growth Agency).
This document outlines coding conventions, design system requirements, security protocols, and architectural patterns to ensure the codebase remains modular, secure, clean, scalable, and of elite visual quality.

---

## 1. Project Philosophy & Core Pillars

1. **Vanguard Aesthetic**: Every public-facing screen must look state-of-the-art. We avoid generic, flat templates. We employ curated palettes (obsidian, titanium, electric indigo `#6366F1`, neon cyan `#06B6D4`, emerald `#10B981`), glassmorphic depths (`backdrop-blur`), subtle ambient glows, and refined micro-interactions.
2. **Modularity First**: Adding a new service, capability, or client case study must NEVER require rewriting layout or core logic. Features and content must be config-driven (`config/services.ts`, `config/portfolio.ts`).
3. **High Performance & Modern SEO**: 
   - 100/100 Core Web Vitals target.
   - Clean HTML5 semantic tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Descriptive `title`, `meta description`, OpenGraph tags, and JSON-LD schema on all routes.
   - Unique descriptive IDs on interactive elements.
4. **Security by Design**: Every endpoint and form incorporates zero-trust input validation, rate limiting, anti-bot honeypots, and defense-in-depth HTTP headers.

---

## 2. Technical Stack & Standards

- **Framework**: Next.js (App Router, latest LTS)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Vanilla CSS with CSS Modules and Design Tokens (CSS Variables in `globals.css`)
- **Icons**: Lucide Icons (`lucide-react`)
- **Animations / Motion**: Fluid CSS transitions, Framer Motion, and lightweight Canvas / SVG effects.
- **Form Handling & Validation**: Zod for client/server schema validation and sanitization.

---

## 3. Directory Structure Convention

```
src/
├── app/                          # Next.js App Router (Layouts & Pages)
│   ├── (site)/                   # Main marketing layout
│   │   ├── page.tsx              # Home / Vanguard Landing
│   │   ├── services/             # Services hub & dynamic [slug] pages
│   │   ├── work/                 # Case studies & client achievements
│   │   └── contact/              # Interactive inquiry form
│   ├── api/                      # Serverless API routes (leads, automations)
│   │   └── inquiry/              # Protected lead submission with rate limiting
│   ├── layout.tsx                # Root layout (fonts, ambient backdrop, smooth scroll)
│   └── globals.css               # Design system tokens and baseline styles
│
├── components/
│   ├── ui/                       # Reusable UI primitives (Button, Card, Badge, Input, Modal)
│   ├── effects/                  # Visual effects (GlowBadge, ParticleCanvas, MagneticWrapper)
│   ├── layout/                   # Navbar, Footer, MobileNav, AnnouncementBar
│   └── sections/                 # Landing modules (Hero, BentoServices, Proof, TechGlobe, CTA)
│
├── config/
│   ├── site.ts                   # Site metadata, social URLs, agency manifesto
│   ├── services.ts               # Modular service catalog
│   └── navigation.ts             # Header and footer navigation links
│
├── hooks/                        # Custom reusable React hooks
├── lib/                          # Utility helpers (cn, security, validation, rate-limiter)
└── types/                        # Global TypeScript interfaces and types
```

---

## 4. Coding & Component Conventions

### Component Structure
- Always separate Server Components (for data fetching, SEO, static layouts) from Client Components (`'use client'` for interactive UI, state, event listeners, and motion).
- Place atomic UI primitives in `@/components/ui`.
- Use descriptive naming: `ServicesBentoGrid`, `HeroCallToAction`, `ClientMetricCard`.

### Styling Guidelines
- Maintain color tokens defined in `globals.css`:
  - `--bg-primary`: Deep void (`#060709` or `#0a0b0f`)
  - `--bg-card`: Glass frosted surface (`rgba(255, 255, 255, 0.03)`)
  - `--border-subtle`: Subtle border (`rgba(255, 255, 255, 0.08)`)
  - `--accent-primary`: High-tech Indigo / Neon Cyan / Emerald
  - `--text-primary`: Pure titanium / off-white (`#f8fafc`)
  - `--text-secondary`: Muted slate (`#94a3b8`)

---

## 5. Security & Web Hardening Standards (Mandatory)

1. **HTTP Security Headers**: Enforced via `next.config.ts`:
   - `Content-Security-Policy`: Disallow untrusted script execution.
   - `X-Frame-Options: DENY`: Block clickjacking attempts.
   - `X-Content-Type-Options: nosniff`: Prevent MIME sniffing.
   - `Referrer-Policy: strict-origin-when-cross-origin`: Prevent data leakage in referrers.
   - `Permissions-Policy`: Restrict camera, microphone, and geolocation.
   - `Strict-Transport-Security`: Force HTTPS.
2. **Server-Side Validation**: Every API route must validate requests with Zod schemas and sanitize string inputs against XSS before database/email storage.
3. **Anti-Bot & Anti-Abuse**:
   - Contact forms must include an invisible honeypot field (`_gotcha`).
   - All public endpoints must implement IP-based rate limiting to prevent DDoS, credential stuffing, and spam flooding.
4. **Secret Isolation**: Sensitive keys (API secrets, database credentials) MUST NEVER start with `NEXT_PUBLIC_` and must be stored in `.env.local` only.

---

## 6. Adding New Agency Services (Modularity Rule)

To add a new service to the agency:
1. Open `src/config/services.ts`.
2. Add a new service entry adhering to the `ServiceConfig` TypeScript interface.
3. The dynamic route `src/app/(site)/services/[slug]/page.tsx` and the homepage Bento Grid will automatically render the new service without modifying component code.

---

## 7. Git & Version Control Policy (STRICT — No Agent Commits)

- **Strict Ban on Commits by AI**: The AI assistant MUST NEVER execute `git commit`, `git push`, `git rebase`, or any command that commits to git history.
- **Human Authority**: Only Lean (the developer) has the authority to review diffs and create commits.
- **Agent Scope**: The agent prepares code, styles, tests, runs validation commands (`npm run build`), and leaves files ready for user inspection.
- **No Pestering**: The agent must NOT prompt or ask Lean to commit/push after every single turn. Only provide git instructions when Lean explicitly asks for them or when a major milestone is fully completed.

---

## 8. Quality & Pre-Commit Checklist (For Developer Review)

Before Lean commits changes:
- [ ] TypeScript compiles cleanly with zero errors (`npm run build`).
- [ ] No `any` types where a proper interface can be specified.
- [ ] Security headers and payload validations verified.
- [ ] All interactive buttons and inputs have accessible `aria-label` or visible text labels.
- [ ] Visual testing performed on mobile, tablet, and desktop viewports.
- [ ] Micro-interactions are smooth and do not cause jank or layout shift.
