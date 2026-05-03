# The Crochet Ghar — Agent Rules

## Stack

- **Framework**: Next.js App Router (`src/app`)
- **CMS**: Sanity (`src/sanity`, Studio at `src/app/(studio)`)
- **Styling**: SCSS — global tokens in `src/app/(client)/scss/abstracts`, co-located `style.scss` per component
- **Tooling**: TypeScript (strict), Biome (lint + format), React Compiler
- **UX libs**: Lenis, Motion, Lucide, Styled Components

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run typegen    # regenerate Sanity types
npm run lint       # biome check
npm run format     # biome format --write
```

Always run `npm run lint` and `npm run format` before calling a change done. Do not consider work complete until Biome and TypeScript are clean.

## Folder Map

```
src/
  app/          # routes, layouts, pages (App Router)
  components/
    ui/         # reusable primitives
    default/    # header, footer, persistent layout
    context/    # providers
  features/     # DDD slices: domain / application / infrastructure / ui
  hooks/
  lib/          # integrations, db helpers
  sanity/       # config, schemas, GROQ helpers, client
  utils/
```

## Non-Negotiable Rules

- **Server Components by default.** Only add `"use client"` for stateful hooks, DOM APIs, Canvas, Motion, or Lenis.
- **Sanity queries belong in** `src/sanity` (generic) or `src/features/<feature>/infrastructure` (feature-specific). Never inline GROQ in route components.
- **SCSS scoping**: component styles use a root `id` selector; all children nested under it. Use `rem()` and shared breakpoints — never raw `px` or ad-hoc media queries.
- **Import direction** in feature slices: `ui → application → domain`; `infrastructure` cannot import `ui`.
- **No `any`** unless there is an explicit, commented reason.

## Detailed Guides

For step-by-step patterns, see:

- [New feature slice](agent_docs/feature-slice.md)
- [New component + SCSS](agent_docs/component-scss.md)
- [Sanity-powered page](agent_docs/sanity-page.md)
- [3D / animation section](agent_docs/animation-3d.md)
