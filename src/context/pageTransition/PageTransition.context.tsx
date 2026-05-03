"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Colors } from "@/utils/colors.utils";
import "./style.scss";
import type { UrlObject } from "node:url";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useLenis } from "lenis/react";
import type { Route } from "next";
import type { LinkProps } from "next/link";

/** Resolves a Next.js href (string or UrlObject) to a plain string for router.push */
function resolveHref(href: Route | UrlObject): Route {
  if (typeof href === "string") return href;
  const { pathname = "", search = "", hash = "" } = href;
  return `${pathname}${search}${hash}` as Route;
}

// Register useGSAP
gsap.registerPlugin(useGSAP, DrawSVGPlugin);

export interface PageTransitionContext {
  isTransitioning: boolean;
  navigateTo: (path: Route | LinkProps<string>["href"]) => void;
}

const PageTransitionContext = createContext<PageTransitionContext>({
  isTransitioning: false,
  navigateTo: () => {},
});

export const usePageTransitionContext = () => useContext(PageTransitionContext);
const path = {
  default: {
    vb: "0 0 1379.36 1144.44",
    d: "M563.6,95S40.6,364,115.6,475,917.6,17,988.6,159,26.6,666,98.6,833,1206.6,156,1280.6,288,311.94,825.95,419.6,1022c95,173,733-534,837-401s-338,361-338,361",
    duration: 2,
  },
  right: {
    vb: "0 0 1590.87 998.26",
    d: "M493.12,199.61L121.15,794.89c-86.13,137.83,112.96,137.83,199.09,0L692.21,199.61c82.99-132.82,282.56-132.82,199.57,0l-371.97,595.28c-86.12,137.83,113.44,137.83,199.57,0l371.97-595.28c82.99-132.82,282.95-132.82,199.96,0l-371.97,595.28c-86.13,137.83,113.44,137.83,199.57,0l371.97-595.28",
    duration: 2,
  },
  spiral: {
    vb: "0 0 1625.06 1819",
    d: "M813.02,100c84,8,165,26,244,59,95,40,179,96,253,170,71,72,125,153,162,246,36,89,54,184,53,280-2,93-19,184-57,270-37,82-85,155-151,218-136,131-320,198-507,176-32-4-62-9-94-17-31-9-59-19-88-32-57-25-106-59-153-101-87-81-145-180-167-299-23-123-5-242,58-349,26-45,57-81,96-116,46-41,97-69,154-89,106-35,220-28,320,24,71,38,128,94,162,167,26,57,37,118,29,181-5,33-14,64-28,94-17,34-39,64-70,89-23,18-45,33-72,43-47,18-98,20-147,6-54-17-99-57-117-111-16-50-2-114,49-137,19-8,41-8,58,5,14,11,14,28,12,43,3,15,14,27,29,31,33,9,65-11,82-40,28-48,17-106-17-149-17-21-35-38-59-49-21-10-42-18-66-21-32-4-63-2-94,7-96,28-163,109-184,207-11,53-9,104,5,155,16,55,44,104,84,146,15,14,29,27,45,40,52,39,108,62,172,73,105,17,205-5,296-62,77-49,134-114,172-194,36-73,51-152,49-232-4-175-95-337-248-437-140-93-296-120-458-85-86,19-158,50-231,101-76,53-131,112-181,189-52,80-81,160-98,253-13,77-13,149-2,225,15,98,46,186,98,272,43,71,92,128,154,182,63,56,133,95,208,129,79,30,160,52,245,58",
    duration: 2,
  },
  spring: {
    vb: "0 0 1252.25 979.16",
    d: "M100.07,852.69S1204.33,374.52,1150.33,262.61,220.59-5.83,242.5,201.56s809.22,489.91,881.22,281.74c46.77-135.22-921.13-274.11-934.83-120.91s833.87,653.87,917.61,480.91S89.9,360.43,100.07,547.48s554.09,331.69,554.09,331.69",
    duration: 2,
  },
};

const PageTransitionProvider = ({
  children,
  color = Colors.primary,
  varient = "default",
}: {
  children: ReactNode;
  color?: string;
  varient?: "default" | "right" | "spiral" | "spring";
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathRef = useRef<SVGPathElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  // Stores the intended route while we wait for the SVG to mount
  const pendingRouteRef = useRef<Route | UrlObject | null>(null);

  const springPath = varient === "spring" ? path.spring : path.right;
  const spiralPath = varient === "spiral" ? path.spiral : springPath;
  const setPath = varient === "default" ? path.default : spiralPath;

  useEffect(() => {
    if (!isTransitioning) return;

    const path = pathRef.current;
    const targetRoute = pendingRouteRef.current;
    if (!path || !targetRoute) return;

    gsap.set(path, {
      drawSVG: "0%",
      strokeWidth: 2,
    });

    gsap.to(path, {
      drawSVG: "100%",
      strokeWidth: 200,
      duration: setPath.duration,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(resolveHref(targetRoute));
        gsap.to(path, {
          drawSVG: "100% 100%",
          strokeWidth: 2,
          duration: setPath.duration,
          ease: "power2.inOut",
          onComplete: () => {
            pendingRouteRef.current = null;
            setIsTransitioning(false);
            // Scroll to top then re-enable smooth scroll
            lenis?.scrollTo(0, { immediate: true });
            lenis?.start();
          },
        });
      },
    });
  }, [isTransitioning, lenis, router, setPath.duration]);

  // Stores the contextSafe-wrapped navigate fn; updated whenever deps change inside useGSAP
  const navigateFnRef = useRef<
    (targetRoute: Route | LinkProps<string>["href"]) => void
  >(() => {});

  // contextSafe must be called inside useGSAP (not during render) so GSAP can track and
  // revert the handler when the component unmounts or deps change.
  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;
      navigateFnRef.current = contextSafe(
        (targetRoute: Route | LinkProps<string>["href"]) => {
          if (isTransitioning || pathname === targetRoute) return;
          pendingRouteRef.current = targetRoute;
          lenis?.stop();
          setIsTransitioning(true);
        },
      );
    },
    { dependencies: [isTransitioning, pathname, lenis], revertOnUpdate: true },
  );

  // Stable reference — delegates to the ref so consumers never re-render from a new fn identity
  const navigateTo = useCallback(
    (targetRoute: Route | LinkProps<string>["href"]) => {
      navigateFnRef.current(targetRoute);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({ isTransitioning, navigateTo }),
    [isTransitioning, navigateTo],
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      <div id="PageTransitionProvider">
        {/* Only mount the SVG while a transition is in progress */}
        {isTransitioning && (
          <div className="svg_path">
            {/* viewBox must match the path's coordinate space (not 100×100) */}
            <svg viewBox={setPath.vb}>
              <title>Page Transition Path</title>
              <path
                ref={pathRef}
                d={setPath.d}
                stroke={color ?? Colors.primary}
                strokeWidth={0}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
};

export default PageTransitionProvider;
