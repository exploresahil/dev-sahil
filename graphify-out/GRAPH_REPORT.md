# Graph Report - .  (2026-04-27)

## Corpus Check
- 130 files · ~210,944 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 202 nodes · 106 edges · 5 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Animation & Motion|Animation & Motion]]
- [[_COMMUNITY_Fonts & Layout|Fonts & Layout]]
- [[_COMMUNITY_Pages|Pages]]
- [[_COMMUNITY_Page Transitions|Page Transitions]]
- [[_COMMUNITY_Responsive & Not Found|Responsive & Not Found]]

## God Nodes (most connected - your core abstractions)
1. `page()` - 5 edges
2. `useShouldUseMotion()` - 4 edges
3. `RootLayout()` - 3 edges
4. `ParagraphGsap()` - 2 edges
5. `PageNotFound()` - 2 edges
6. `HomeSkills()` - 2 edges
7. `ParallaxImages()` - 2 edges
8. `usePageTransitionContext()` - 2 edges
9. `TransitionLink()` - 2 edges
10. `useResponsive()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `useFonts()`  [INFERRED]
  F:\code\sahil-new-in\src\app\(client)\reduce-motion-info\layout.tsx → F:\code\sahil-new-in\src\utils\fonts.util.ts
- `ParagraphGsap()` --calls--> `useShouldUseMotion()`  [INFERRED]
  F:\code\sahil-new-in\src\components\animations\paragraph-gsap\ParagraphGsap.tsx → F:\code\sahil-new-in\src\hooks\usePrefersReducedMotion.hook.ts
- `PageNotFound()` --calls--> `useResponsive()`  [INFERRED]
  F:\code\sahil-new-in\src\components\default\not-found\PageNotFound.section.tsx → F:\code\sahil-new-in\src\hooks\useResponsive.hook.ts
- `HomeSkills()` --calls--> `useShouldUseMotion()`  [INFERRED]
  F:\code\sahil-new-in\src\components\home\skills\HomeSkills.section.tsx → F:\code\sahil-new-in\src\hooks\usePrefersReducedMotion.hook.ts
- `ParallaxImages()` --calls--> `useShouldUseMotion()`  [INFERRED]
  F:\code\sahil-new-in\src\components\projects\components\sections\parallaxScroll\ParallaxImages.component.tsx → F:\code\sahil-new-in\src\hooks\usePrefersReducedMotion.hook.ts

## Communities

### Community 1 - "Animation & Motion"
Cohesion: 0.25
Nodes (4): HomeSkills(), ParagraphGsap(), ParallaxImages(), useShouldUseMotion()

### Community 2 - "Fonts & Layout"
Cohesion: 0.33
Nodes (2): useFonts(), RootLayout()

### Community 3 - "Pages"
Cohesion: 0.33
Nodes (1): page()

### Community 6 - "Page Transitions"
Cohesion: 0.4
Nodes (2): usePageTransitionContext(), TransitionLink()

### Community 7 - "Responsive & Not Found"
Cohesion: 0.4
Nodes (2): PageNotFound(), useResponsive()

## Knowledge Gaps
- **Thin community `Fonts & Layout`** (6 nodes): `useFonts()`, `generateMetadata()`, `RootLayout()`, `layout.tsx`, `layout.tsx`, `fonts.util.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pages`** (6 nodes): `page()`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Page Transitions`** (5 nodes): `resolveHref()`, `usePageTransitionContext()`, `PageTransition.context.tsx`, `TransitionLink.component.tsx`, `TransitionLink()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Responsive & Not Found`** (5 nodes): `PageNotFound()`, `PageNotFound.section.tsx`, `useResponsive.hook.ts`, `getBreakpoint()`, `useResponsive()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 3 inferred relationships involving `useShouldUseMotion()` (e.g. with `ParagraphGsap()` and `HomeSkills()`) actually correct?**
  _`useShouldUseMotion()` has 3 INFERRED edges - model-reasoned connections that need verification._