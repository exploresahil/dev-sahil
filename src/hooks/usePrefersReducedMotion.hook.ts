"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if animations should play (i.e., user has NOT requested reduced motion).
 */
export function useShouldUseMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  // Initialize state based on current preference (SSR-safe)
  const [shouldUseMotion, setshouldUseMotion] = useState<boolean>(() => {
    if (globalThis.window === undefined) return true;
    return !globalThis.window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
  });

  useEffect(() => {
    setMounted(true);
    const mediaQuery = globalThis.window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const handler = (event: MediaQueryListEvent) => {
      // true means user prefers reduced motion, so animations off => shouldUseMotion = false
      setshouldUseMotion(!event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return mounted && shouldUseMotion;
}
