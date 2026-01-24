# CLAUDE.md — Portfolio Project Guide

## Project Overview

Personal portfolio for an **AI Security Engineer** showcasing the intersection of AI and cybersecurity expertise. The site is a high-polish, single-page application with a minimalist luxury aesthetic.

**Live URL:** https://ethansam.io
**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion

---

## Systems Thinking Framework

### Core Purpose
This portfolio exists to **convert visitors into opportunities** (jobs, collaborations, speaking invitations). Every design decision should be evaluated against this goal.

### Visitor Mental Model
Visitors arrive with limited attention. The information hierarchy is intentional:

```
Hero (3 sec)     → "AI Security Engineer who builds things"
Projects (30 sec) → "Here's proof — real systems, real impact"
Experience (20 sec) → "Credible trajectory, progressive responsibility"
Education (10 sec) → "Strong academic foundation (NYU, 3.96 GPA)"
Contact (5 sec)   → "Easy to reach"
```

**Do not** add content that disrupts this flow without clear ROI.

### Content Hierarchy (Priority Order)
1. **Projects** — Primary proof of capability (spotlight cards, maximum visual weight)
2. **Experience** — Career credibility (timeline, medium weight)
3. **Education** — Academic credentials (timeline, medium weight)
4. **Ideas** — Depth of thinking (glass cards, lower weight)
5. **Contact** — Conversion point (CTA, always accessible)

### Adding New Sections
Before adding any new section, answer:
1. Does this help convert visitors into opportunities?
2. Where does it fit in the hierarchy?
3. What existing pattern (spotlight/glass/timeline) should it use?
4. Will I maintain it? (Empty sections hurt more than missing ones)

---

## Design System

### Color Palette (CSS Variables)
```css
/* Backgrounds */
--bg-primary: #0a0a0b      /* Main background */
--bg-secondary: #111113    /* Elevated surfaces */
--bg-elevated: #18181b     /* Cards, modals */
--bg-glass: rgba(24, 24, 27, 0.6)  /* Frosted glass effect */

/* Text */
--text-primary: #f5f2eb    /* Headlines, primary content */
--text-secondary: #a8a29e  /* Body text, descriptions */
--text-muted: #857f78      /* Metadata, timestamps */

/* Accent — Champagne Gold (use sparingly) */
--accent-gold: #c9a962           /* Primary accent */
--accent-gold-soft: rgba(201, 169, 98, 0.15)  /* Backgrounds */
--accent-gold-glow: rgba(201, 169, 98, 0.3)   /* Shadows, glows */
--accent-warm: #e8d5b7           /* Secondary warm tone */

/* Borders */
--border-subtle: rgba(245, 242, 235, 0.06)   /* Default borders */
--border-medium: rgba(245, 242, 235, 0.12)   /* Hover states */
--border-accent: rgba(201, 169, 98, 0.3)     /* Active/focus */
```

### Typography
- **Display font:** `Syne` — Bold headlines, section titles, project names
- **Body font:** `Outfit` — Paragraphs, descriptions, UI text
- **Hierarchy:** Use tight letter-spacing on large text (`-0.04em` to `-0.02em`)

### Animation Conventions
```javascript
// Standard easing curve (use everywhere)
ease: [0.16, 1, 0.3, 1]  // ease-out-expo

// Standard durations
duration: 0.6 - 0.8      // Content reveals
duration: 0.3 - 0.4      // Hover states
duration: 0.5            // Border/color transitions

// Stagger pattern for lists
delay: index * 0.15      // Items in a list
```

### Component Patterns

#### SpotlightCard (High Emphasis)
- Mouse-following radial gradient glow
- Use for: Projects, featured content
- Located: `src/components/ui/SpotlightCard.tsx`

#### Glass Card (Medium Emphasis)
- Frosted glass with backdrop blur
- Hover: border color transition to `--border-accent`
- Use for: Timeline items, notes, secondary content
- Class: `.glass-card`

#### Timeline Item
- Vertical line with animated gold dot
- Content in glass card
- Use for: Experience, Education, chronological content
- Located: `src/components/TimelineItem.tsx`

### Visual Hierarchy Rules
1. **Projects get spotlight effect** — They're the main proof
2. **Timeline items get glass cards** — Supporting evidence
3. **Notes should use glass cards** — Secondary content, lower visual weight
4. **Gold accent is precious** — Use for: active states, key metrics, CTAs. Never decorative.

---

## Code Conventions

### File Structure
```
src/
├── app/                    # Next.js app router
│   ├── globals.css         # All CSS variables and component styles
│   └── page.tsx            # Main entry point
├── components/
│   ├── sections/           # Page sections (ProjectsSection, etc.)
│   ├── ui/                 # Reusable UI components
│   └── *.tsx               # Standalone components
├── lib/
│   ├── data.ts             # All content data (projects, experience, etc.)
│   └── utils.ts            # Utility functions (cn, etc.)
└── types/
    └── index.ts            # TypeScript interfaces
```

### Data Management
- All content lives in `src/lib/data.ts`
- Content is typed via interfaces in `src/types/index.ts`
- No CMS — intentionally simple, content changes are code changes

### Component Patterns
```typescript
// Standard component structure
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({ props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Content */}
    </motion.div>
  );
};
```

### Styling Approach
1. **CSS variables first** — Always use `var(--variable-name)`
2. **Tailwind for layout** — Spacing, grid, flex
3. **Custom classes for components** — Defined in `globals.css`
4. **Framer Motion for animation** — Not CSS animations (except keyframes)

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Deployment
# Configured for Vercel — push to main triggers deploy
```

---

## Ideas Section (Implemented)

### Strategic Intent
- Label: **"Ideas"** (accessible, welcoming, low commitment)
- Tagline: "I publish when I learn something worth sharing."
- Purpose: Show depth of thinking, not just output
- URL: `ethansam.io/ideas`

### Architecture
```
src/
├── app/
│   └── ideas/
│       ├── page.tsx              # Ideas index page
│       └── [slug]/
│           └── page.tsx          # Individual idea page
├── components/
│   ├── IdeaCard.tsx              # Glass card with gold left-accent
│   └── sections/
│       └── IdeasSection.tsx      # Homepage featured ideas
└── lib/
    ├── data.ts                   # Ideas metadata (Idea[] array)
    └── ideas-content.ts          # Full markdown content by slug
```

### Data Model
```typescript
interface Idea {
  slug: string;        // URL-safe identifier
  title: string;       // Display title
  excerpt: string;     // 1-2 sentence summary
  category: string;    // e.g., "Career", "AI", "Security"
  readTime: string;    // e.g., "6 min read"
  publishedAt: string; // ISO date string
  featured?: boolean;  // Show on homepage
}
```

### Adding New Ideas
1. Add metadata to `ideas` array in `src/lib/data.ts`
2. Add content to `ideasContent` object in `src/lib/ideas-content.ts`
3. Set `featured: true` to show on homepage (max 3)

### Content Strategy (Signature Lanes)
1. **Build logs:** "How I built X (and what broke)"
2. **Evaluation notes:** "How I tested model/tool Y"
3. **System design:** "Architecture decisions and why"
4. **Career leverage:** "How I automated X workflow"

### Design Decisions
- **Glass cards** (not spotlight) — lower visual weight than projects
- **Gold left-accent line** — visual distinction from timeline items
- **Markdown content** — uses react-markdown for rich formatting
- **No CMS** — content is code, matches portfolio philosophy

---

## Things to Avoid

1. **Generic content** — No "What is RAG?" posts. Only differentiated, personal insights.
2. **Over-engineering** — This is a portfolio, not a SaaS. Keep it simple.
3. **Stale sections** — An empty Notes tab is worse than no Notes tab.
4. **Breaking the hierarchy** — Projects > Experience > Education > Notes
5. **Overusing gold accent** — It's precious. Reserve for interactive states and key data.
6. **Adding dependencies without justification** — The stack is intentionally lean.

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2024-XX | Single-page architecture | Maximum first-impression impact |
| 2024-XX | Dark mode only | Matches luxury aesthetic, reduces maintenance |
| 2024-XX | No CMS | Simplicity > flexibility for a personal site |
| 2026-01-24 | Ideas section implemented | "Ideas" chosen over "Notes"/"Blog" for accessibility |
| 2026-01-24 | react-markdown added | Rich content formatting without CMS complexity |

---

## Contributing (For Future Claude Sessions)

When working on this portfolio:
1. **Read this file first** — Understand the system before changing parts
2. **Maintain visual hierarchy** — Projects are king
3. **Use existing patterns** — SpotlightCard, glass-card, TimelineItem
4. **Match animation conventions** — `[0.16, 1, 0.3, 1]` easing, 0.15s stagger
5. **Update this file** — If you add patterns or make decisions, document them
