# Agents

## Critical: `npm run dev` auto-runs typegen

```bash
npm run dev  # runs "npx next typegen" first via predev hook, then "next dev"
```

Do not skip `predev`. If you need to run dev without typegen, call `next dev` directly.

## React Compiler is enabled

`babel-plugin-react-compiler` is in devDependencies and `reactCompiler: true` is set in `next.config.ts`. The compiler will error if components have improper memoization or violate rules.

## TypeScript strict mode

`strict: true` in tsconfig.json. No implicit any, no loose typing.

## Biome ignores internal dirs

Biome (`npm run lint`) excludes `.claude/`, `.cursor/`, `.agent/`, `.next/`, `node_modules/`, `dist/`, `build/`. These are not scanned.

## Path alias

Use `@/*` to reference `src/*` (configured in tsconfig.json).

## Planned dirs not yet created

- `src/sanity/` — CMS integration (planned, not yet implemented)
- `src/features/` — DDD feature slices (planned, not yet implemented)

## Useful references

- `agent_docs/feature-slice.md` — how to add new features
- `agent_docs/component-scss.md` — SCSS pattern for components
- `agent_docs/sanity-page.md` — Sanity page pattern (when CMS is added)
- `agent_docs/animation-3d.md` — GSAP / Three.js patterns

## Dev server config

`next.config.ts` allows dev connections from `192.168.1.4`, `192.168.1.6`, `192.168.1.8` (allowedDevOrigins). Remote image domains: `ik.imagekit.io`, `images.unsplash.com`, `i.postimg.cc`.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
