# Adding a New Component with SCSS

1. Choose location:
   - Shared primitive → `src/components/ui`
   - Layout/persistent UI → `src/components/default`
   - Feature-specific → `src/features/<feature>/ui`

2. Create `Component.tsx` and `style.scss` side by side.

3. In `Component.tsx`:
   ```tsx
   import "./style.scss";
   ```

4. In `style.scss`:
   ```scss
   @use "../../../app/(client)/scss/abstracts" as *;

   #ComponentName {
     // use rem(), shared breakpoints, no raw px
   }
   ```

5. Use `id="ComponentName"` on the outermost element.

6. Run `npm run format` and fix any Biome or TypeScript issues.
