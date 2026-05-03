# Adding a New Feature Slice

1. Create `src/features/<feature>/{domain,application,infrastructure,ui}/`.
2. `domain/` — entities, value objects, domain rules. No React, no Next.js, no IO.
3. `application/` — use-cases and ports/interfaces. Depends only on `domain/`.
4. `infrastructure/` — implements ports (Sanity queries, API clients). Imports `domain` types and `application` ports only.
5. `ui/` — React components. Server/client boundaries live here. Calls `application` use-cases.
6. Wire into `src/app` routes by importing from `features/<feature>/ui`.
7. Run `npm run lint` and `npm run format`.
