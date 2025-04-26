'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true if animations should play (i.e., user has NOT requested reduced motion).
 */
export function useShouldUseMotion(): boolean {
    // Initialize state based on current preference (SSR-safe)
    const [shouldUseMotion, setshouldUseMotion] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true;
        return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (event: MediaQueryListEvent) => {
            // true means user prefers reduced motion, so animations off => shouldUseMotion = false
            setshouldUseMotion(!event.matches);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handler);
        } else {
            mediaQuery.addEventListener('change', handler);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handler);
            } else {
                mediaQuery.removeEventListener('change', handler);
            }
        };
    }, []);

    return shouldUseMotion;
}