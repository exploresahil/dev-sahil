import { useState, useEffect } from "react";

type Breakpoint = "small" | "medium" | "large" | "xLarge";

const getBreakpoint = (width: number): Breakpoint => {
  if (width >= 2040) return "xLarge";
  if (width >= 1025) return "large";
  if (width >= 820) return "medium";
  return "small";
};

interface UseResponsiveReturn {
  breakpoint: Breakpoint | null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isXLarge: boolean;
  useBreakpoint: (width: number) => Breakpoint;
}

const useResponsive = (): UseResponsiveReturn => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(() => {
    if (typeof window !== 'undefined') {
      return getBreakpoint(window.innerWidth);
    }
    return null;
  });

  const isMobile = breakpoint === "small";
  const isTablet = breakpoint === "medium";
  const isDesktop = breakpoint === "large";
  const isXLarge = breakpoint === "xLarge";

  useEffect(() => {
    if (typeof window === "undefined") return; // skip on server-side

    const handleWindowResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const useBreakpoint = (width: number): Breakpoint => getBreakpoint(width);

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isXLarge,
    useBreakpoint
  };
};

export default useResponsive;
