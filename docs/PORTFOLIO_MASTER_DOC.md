# PORTFOLIO SITE — MASTER BUILD SPEC
**Mayur Subhash Ghadi — Personal Portfolio**
**Version:** 1.0
**Last Updated:** March 2026

---

## Overview

Personal portfolio site. Single page, vertical scroll, editorial dark aesthetic. Data-driven architecture — all content lives in `data/portfolio.ts`, UI is purely presentational. Future reskins only touch components, never data.

**Repo:** `mayurG2299/portfolio`
**Deploy:** Cloudflare Pages
**Domain:** `mayur.ghaadi.in`
**Stack:** Next.js 14, TypeScript, `output: "export"` (SSG), Tailwind CSS, Framer Motion

---

## Design Direction

### Aesthetic
- **Vibe:** Senior engineer's personal site. Editorial, confident, not "hire me please."
- **Layout:** Full width, single page, vertical scroll. No sidebar. No tabs. Sections flow naturally.
- **Dark default** with light mode toggle
- **Typography:** `Syne` (headings — geometric, bold, distinctive) + `IBM Plex Mono` (tech accents, stack tags) + `DM Sans` (body text)
- **Accent color:** Amber `#f59e0b` — single accent, used sparingly
- **Backgrounds:** Near-black `#0f0f0f` dark / `#f7f6f2` light — not pure black/white
- **Cards:** `#1a1a1a` dark / `#ffffff` light with subtle border
- **Whitespace:** Generous. Sections breathe.

### Animation Philosophy
Subtle and refined — just enough to feel alive. Nothing that gets in the way.
- **Hero:** Word-by-word text reveal on page load using Framer Motion `staggerChildren`
- **Section entrances:** Fade + translate-y (20px → 0) triggered by Intersection Observer via Framer Motion `whileInView`
- **Project cards:** Subtle border glow on hover, slight scale (1.0 → 1.02)
- **Tech stack badges:** Staggered fade-in when section enters viewport
- **Nav indicator:** Smooth underline slide between active section
- **Background:** Static subtle noise texture overlay — no moving gradients, keeps it refined
- **Scroll:** Native smooth scroll, no libraries needed
- **Reduced motion:** Respect `prefers-reduced-motion` — all animations wrapped in a hook that disables them

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              — metadata, OG tags, fonts, theme provider
│   ├── page.tsx                — main page shell, section composition
│   └── globals.css             — CSS variables, base styles, noise texture
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          — fixed top nav, section links, theme toggle
│   │   └── Footer.tsx          — minimal footer, copyright, socials
│   ├── sections/
│   │   ├── Hero.tsx            — name, title, pitch, CTAs
│   │   ├── About.tsx           — bio + "what I do" cards
│   │   ├── Projects.tsx        — project cards with tech stack
│   │   ├── Experience.tsx      — minimal timeline
│   │   └── Contact.tsx         — contact form
│   └── ui/
│       ├── SectionHeading.tsx  — reusable section title with amber underline
│       ├── TechBadge.tsx       — monospace tech stack pill
│       ├── ProjectCard.tsx     — individual project card
│       └── AnimatedSection.tsx — reusable whileInView wrapper
├── data/
│   └── portfolio.ts            — SINGLE SOURCE OF TRUTH
├── hooks/
│   └── useReducedMotion.ts     — respects prefers-reduced-motion
├── public/
│   ├── avatar.jpg              — your photo
│   └── noise.png               — subtle noise texture (generate once)
└── next.config.ts
```

---

## Data Schema — `data/portfolio.ts`

This is the complete schema. All UI components consume this. Never hardcode content in components.

```ts
export const portfolioData = {
  // — Identity
  name: "Mayur Subhash Ghadi",
  title: "Senior Software Engineer",
  pitch: "I build high-traffic backend systems and ship products end-to-end.",
  avatar: "/avatar.jpg",
  location: "Mumbai, India",
  email: "ghadim221999@gmail.com",
  phone: "+91 9869128581",

  // — Socials
  socials: {
    linkedin: "https://linkedin.com/in/mayurghadi2299",
    github: "https://github.com/mayurG2299",
  },

  // — CTAs in hero
  cta: {
    primary: { label: "View Projects", href: "#projects" },
    secondary: { label: "Download Resume", href: "/resume.pdf" },
  },

  // — About
  about: {
    bio: [
      "Senior Software Engineer with 6+ years building production systems...", // paragraph 1
      "I care about system ownership end-to-end...",                            // paragraph 2
    ],
    whatIDo: [
      {
        icon: "server",
        title: "Backend Engineering",
        desc: "High-traffic APIs, microservices, and system design with Node.js, NestJS, and AWS.",
      },
      {
        icon: "layout",
        title: "Web Development",
        desc: "Full-stack delivery with React and Next.js when the product needs it.",
      },
      {
        icon: "cloud",
        title: "Infrastructure",
        desc: "Docker-first deployments, CI/CD pipelines, and AWS infra.",
      },
      {
        icon: "shield",
        title: "Security",
        desc: "VAPT testing, secrets management, and secure-by-default architecture.",
      },
    ],
  },

  // — Skills (for About section badges)
  skills: {
    Backend: ["Node.js", "NestJS", "Express.js", "TypeScript", "REST APIs"],
    Frontend: ["React.js", "Next.js"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    Cloud: ["AWS Lambda", "AWS S3", "AWS EC2", "Docker"],
    Observability: ["SigNoz", "Sentry", "AppOptics"],
    Tools: ["Git", "CI/CD", "Serverless"],
  },

  // — Projects
  projects: [
    {
      name: "S3 Portal",
      slug: "s3-portal",
      featured: true,
      tagline: "Self-hosted S3 file management portal for teams",
      description: "Production-grade portal with AES-256-GCM encryption, RBAC, presigned URL uploads, multipart support, audit logs, quota management, and expiring share links.",
      stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "AWS S3", "Docker", "AES-256-GCM"],
      links: {
        github: "https://github.com/mayurG2299/s3-portal",
        dockerHub: "https://hub.docker.com/r/may99/s3-portal",
        live: null, // for future landing page
      },
      highlights: [
        "AES-256-GCM encryption — zero plaintext secrets",
        "RBAC with team-level access control and audit logs",
        "Multi-arch Docker builds (amd64 + arm64), deployable via docker-compose",
        "Six-theme UI system for flexible branding",
      ],
    },
    // Add more projects here in future — same shape
  ],

  // — Experience (minimal — full detail lives in resume.ts)
  experience: [
    {
      company: "Fitpage (IndiaRunning)",
      location: "Mumbai",
      roles: [
        {
          title: "Pod Co-Lead",
          dates: "Oct 2025 – Present",
          highlights: [
            "Full ownership of product backend and roadmap for 10k+ DAU",
            "Unified communication platform — 50k+ notifications/day",
          ],
        },
        {
          title: "Core Team Lead",
          dates: "Jan 2025 – Oct 2025",
          highlights: [
            "Led cross-functional team of 3 across feature development and deployment",
            "Security hardening via VAPT testing and backend-issued S3 signed URLs",
          ],
        },
        {
          title: "Senior Web Application Developer",
          dates: "Jun 2024 – Jan 2025",
          highlights: [
            "Built core platform modules serving 10k+ daily active users",
            "Self-hosted Listmonk email system handling 100k+ emails/month",
          ],
        },
      ],
    },
    {
      company: "Sugar Cosmetics",
      location: "Mumbai",
      roles: [
        {
          title: "Backend Developer",
          dates: "May 2022 – Jun 2024",
          highlights: [
            "CLUB Vellvette membership — contributed to 20–30% AOV increase, 50k+ users",
            "High-traffic campaign backends handling 10k+ concurrent users",
          ],
        },
      ],
    },
    {
      company: "Vistaar Technologies",
      location: "Mumbai",
      roles: [
        {
          title: "Software Engineer",
          dates: "Aug 2020 – Apr 2022",
          highlights: [
            "Frontend and backend for Investments & Funds dashboards",
          ],
        },
      ],
    },
  ],

  // — Education
  education: [
    {
      degree: "B.E. in Computer Science",
      institution: "A.C. Patil College of Engineering, Mumbai",
      dates: "2016 – 2020",
      grade: "CGPA: 7.63 / 10",
    },
  ],

  // — Contact
  contact: {
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // replace after Formspree setup
  },

  // — SEO / Meta
  meta: {
    url: "https://mayur.ghaadi.in",
    description: "Senior Software Engineer specializing in backend systems, Node.js, NestJS, and AWS. Based in Mumbai.",
    ogImage: null, // add later
  },
}
```

---

## Theme System

`globals.css`:
```css
:root {
  --bg: #f7f6f2;
  --bg-card: #ffffff;
  --bg-card-hover: #f0efeb;
  --text: #0f0f0f;
  --text-muted: #6b7280;
  --accent: #f59e0b;
  --border: #e5e7eb;
  --font-heading: 'Syne', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --font-body: 'DM Sans', sans-serif;
}

[data-theme="dark"] {
  --bg: #0f0f0f;
  --bg-card: #1a1a1a;
  --bg-card-hover: #222222;
  --text: #f5f5f5;
  --text-muted: #9ca3af;
  --accent: #f59e0b;
  --border: #2a2a2a;
}
```

Theme stored in `localStorage` key `portfolio_theme`. Default: `dark`.
Applied as `data-theme` attribute on `<html>` tag.
Load theme from localStorage before paint to avoid flash — use inline script in `<head>`.

---

## Sections Spec

### Navbar
- Fixed top, full width
- Left: your initials "MG" in amber as logo
- Right: section links (About, Projects, Experience, Contact) + theme toggle icon
- Active section highlighted with amber underline — tracks scroll position via Intersection Observer
- Backdrop blur on scroll: `backdrop-filter: blur(12px)` with subtle border-bottom
- Mobile: hamburger menu

### Hero
- Full viewport height (`100vh`)
- Left-aligned text, not centered
- Large `Syne` heading: "Mayur Subhash Ghadi" — word-by-word reveal animation on load
- Subtitle: title in smaller text, muted color
- One-liner pitch below
- Two CTA buttons: primary (amber filled) + secondary (outlined)
- Subtle ambient background: noise texture only, no gradients
- Scroll indicator arrow at bottom center

### About
- Two-column on desktop: bio left (2 paragraphs), "What I Do" cards right (2x2 grid)
- Single column on mobile
- Skills section below: grouped badges by category, `IBM Plex Mono` font for badge text
- Staggered badge entrance animation

### Projects
- `SectionHeading` with "Projects"
- Featured project (S3 Portal) gets a wider card spanning full width with more detail
- Regular projects in 2-column grid below
- Each card: project name, tagline, tech stack badges, highlight bullets, GitHub/DockerHub links
- Card hover: subtle border glow (`box-shadow: 0 0 0 1px var(--accent)`) + scale 1.02
- Tech stack uses `IBM Plex Mono` badges

### Experience
- Minimal vertical timeline
- Amber dot + vertical line on left
- Company name bold, role title + dates on same row
- 2 highlight bullets per role max — keep it scannable
- No walls of text

### Contact
- Centered, max-width 600px
- Fields: Full Name, Email, Subject, Message
- Submit via Formspree
- Success state: checkmark animation + "Thanks, I'll get back to you."
- Error state: red border on failed fields
- No map

### Footer
- Minimal: "Built by Mayur Ghadi" + year + socials
- One line

---

## Animation Spec (Framer Motion)

```ts
// AnimatedSection.tsx — reusable wrapper
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
// Use whileInView + viewport={{ once: true, margin: "-100px" }}

// Hero text stagger
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

// Reduced motion hook
const useReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
// If true, pass empty variants — no animation
```

Install: `npm install framer-motion`

---

## Formspree Setup
1. Go to formspree.io → create free account → new form
2. Copy the endpoint URL (format: `https://formspree.io/f/XXXXXXXX`)
3. Paste into `portfolioData.contact.formspreeEndpoint`
4. No env var needed — endpoint is public and spam-protected by Formspree

---

## Deployment
1. Push repo to GitHub
2. Cloudflare Pages → Connect repo → Build command: `npm run build` → Output: `out`
3. Add CNAME in Cloudflare DNS: `mayur` → `<project>.pages.dev` (proxied)
4. Done

---

## Agent Build Order — 5 Sequential Prompts

### Prompt 1 — Project Scaffold + Theme System
Set up Next.js 14 project with TypeScript and Tailwind. Install Framer Motion. Configure `output: "export"` in `next.config.ts`. Load fonts via `next/font/google`: Syne, IBM Plex Mono, DM Sans. Set up `globals.css` with full CSS variable system for both dark and light themes. Implement theme toggle — store in `localStorage` key `portfolio_theme`, apply as `data-theme` on `<html>`, add inline script in `<head>` to prevent flash. Create shell `page.tsx` with placeholder sections. Create `useReducedMotion` hook.

Verification: `npm run build` exits clean. Dark/light toggle works without flash on reload.

---

### Prompt 2 — Data File + Navbar + Hero
Create `data/portfolio.ts` with the full schema as defined in the spec — all real content, no placeholder text. Build `Navbar.tsx` — fixed top, "MG" logo in amber, section links, theme toggle, active section tracking via Intersection Observer, backdrop blur on scroll, mobile hamburger. Build `Hero.tsx` — full viewport height, left-aligned, large Syne heading with word-by-word Framer Motion reveal, subtitle, pitch, two CTA buttons, scroll indicator. Wire to real data.

Verification: `npm run build` clean. Hero animation plays on load. Navbar active state updates on scroll. Theme toggle works.

---

### Prompt 3 — About + Skills
Build `About.tsx` — two-column layout (bio left, "What I Do" 2x2 cards right), staggered whileInView entrance. Build skills section below with grouped `TechBadge` components in IBM Plex Mono, staggered entrance. Build reusable `SectionHeading.tsx` with amber underline and `AnimatedSection.tsx` wrapper. Wire all content from `portfolioData`.

Verification: `npm run build` clean. About section animates correctly on scroll. Both columns render on desktop, stacks on mobile.

---

### Prompt 4 — Projects + Experience
Build `Projects.tsx` — featured S3 Portal full-width card + regular project grid below. Card hover: border glow + scale. Tech badges in IBM Plex Mono. GitHub and DockerHub link buttons. Build `Experience.tsx` — vertical amber timeline, company/role/dates, 2 highlight bullets per role, staggered entrance. Wire all content from `portfolioData`.

Verification: `npm run build` clean. Featured card distinguishable from regular cards. Timeline renders correctly. Hover states work.

---

### Prompt 5 — Contact + Footer + Polish
Build `Contact.tsx` — centered form, Formspree submit, success/error states with subtle animation. Build `Footer.tsx` — minimal one-liner. Final polish pass: check all sections on mobile (375px), verify reduced motion works, check light mode on all sections, verify no layout breaks, check all links are wired to real data.

Verification: `npm run build` clean. Form submits to Formspree test endpoint successfully. All sections render correctly on mobile in both themes.
