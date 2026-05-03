# Adding a 3D / Animation-Heavy Section

Install on demand if not already present:
```bash
npm i gsap three @react-three/fiber @react-three/drei
```

1. Create a `"use client"` component to own the `<Canvas />` and/or GSAP animations.
2. If not above-the-fold, wrap with `next/dynamic` + `ssr: false`.
3. Keep the scene graph minimal; use Drei helpers to reduce boilerplate.
4. Use `frameloop="demand"` for mostly static scenes.
5. Encapsulate animation logic in dedicated hooks — do not leak it into `domain` or `application` layers.
6. Verify FPS/CPU in the browser and tune if needed.
7. Run `npm run lint` and `npm run format`.

## Docs
- GSAP: https://gsap.com/docs/v3/
- Three.js: https://threejs.org/docs/
- R3F: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- Drei: https://docs.pmnd.rs/drei/introduction