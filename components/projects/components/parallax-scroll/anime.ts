// anime.ts
export type ImageConfig = {
    y: { from: number; to: number; };
    objectPosition: { from: string; to: string; };
    scrollTrigger: { start: string; end: string; };
    markers: boolean;
};

interface ResponsiveFlags {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isXLarge: boolean;
}

// Base animation settings (desktop / large default)
const baseConfig: Record<string, ImageConfig> = {
    img1: {
        y: { from: 0, to: -50 },
        objectPosition: { from: "50% 50%", to: "50% 100%" },
        scrollTrigger: { start: "top 35%", end: "50% 50%" },
        markers: false,
    },
    img2: {
        y: { from: 0, to: 20 },
        objectPosition: { from: "50% 100%", to: "50% 0%" },
        scrollTrigger: { start: "-10% 40%", end: "60% 50%" },
        markers: false,
    },
    img3: {
        y: { from: 50, to: -20 },
        objectPosition: { from: "50% 0%", to: "50% 100%" },
        scrollTrigger: { start: "0% 45%", end: "80% 50%" },
        markers: false,
    },
    img4: {
        y: { from: -50, to: 0 },
        objectPosition: { from: "50% 100%", to: "50% 0%" },
        scrollTrigger: { start: "0% 45%", end: "90% 50%" },
        markers: false,
    },
    img5: {
        y: { from: 40, to: -40 },
        objectPosition: { from: "50% 0%", to: "50% 100%" },
        scrollTrigger: { start: "0% 45%", end: "100% 50%" },
        markers: false,
    },
    img6: {
        y: { from: 100, to: 0 },
        objectPosition: { from: "50% 100%", to: "50% 0%" },
        scrollTrigger: { start: "40% 45%", end: "100% 50%" },
        markers: false,
    },
};

// Adjustments for tablet viewports
const tabletOverrides: Partial<Record<string, Partial<ImageConfig>>> = {
    img1: { y: { from: 0, to: -30 }, objectPosition: { from: "50% 60%", to: "50% 100%" } },
    img3: { y: { from: 30, to: -10 } },
    // add more as needed...
};



export function getAnimationConfig(flags: ResponsiveFlags): Record<string, ImageConfig> {
    // Start with desktop/large defaults
    const config: Record<string, ImageConfig> = { ...baseConfig };

    if (flags.isTablet) {
        Object.entries(tabletOverrides).forEach(([key, override]) => {
            config[key] = { ...config[key], ...override } as ImageConfig;
        });
    }

    // You can extend logic here for isXLarge, etc.
    return config;
}
