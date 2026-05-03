# Wiring a Sanity-Powered Page

1. Confirm or add the schema in `src/sanity`.
2. Add a typed GROQ query helper in `src/sanity` (generic) or `src/features/<feature>/infrastructure` (feature-specific).
3. Create the route component in `src/app` as a **Server Component** that calls the query helper.
4. For interactive/animated parts, render a `"use client"` child component.
5. Use the configured Sanity image helpers for all images.
6. Run `npm run typegen` if schemas changed.
7. Run `npm run lint` and `npm run format`.