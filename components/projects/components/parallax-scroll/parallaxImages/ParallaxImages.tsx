// ParallaxImages.tsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useMemo, Suspense } from "react";
import useResponsive from "@/hooks/useResponsive";
import ImageSize from "@/utils/imageSize";
import "./style.scss";
import { getAnimationConfig } from "../anime";
import { imagesDataParallaxScroll } from "../db";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion";

export function ParallaxImages() {
  const container = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, isDesktop, isXLarge } = useResponsive();

  const shouldUseMotion = useShouldUseMotion();

  const animationConfig = useMemo(
    () => getAnimationConfig({ isMobile, isTablet, isDesktop, isXLarge }),
    [isMobile, isTablet, isDesktop, isXLarge]
  );

  gsap.registerPlugin(ScrollTrigger);

  //console.log("shouldUseMotion->", shouldUseMotion);

  useGSAP(
    () => {
      if (!shouldUseMotion) return;

      Object.entries(animationConfig).forEach(([className, config]) => {
        const triggerOpts = {
          trigger: container.current,
          start: config.scrollTrigger.start,
          end: config.scrollTrigger.end,
          scrub: true,
          markers: config.markers,
        };
        gsap.fromTo(
          `.${className}`,
          { y: config.y.from },
          { y: config.y.to, scrollTrigger: triggerOpts }
        );
        gsap.fromTo(
          `.${className} img`,
          { objectPosition: config.objectPosition.from },
          {
            objectPosition: config.objectPosition.to,
            ease: "power1.inOut",
            scrollTrigger: triggerOpts,
          }
        );
      });
    },
    { scope: container, dependencies: [shouldUseMotion] }
  );

  return (
    <>
      <div className="title">
        <h1>Explore Wes Anderson Inspired Gallery</h1>
      </div>
      <div className="images_container" ref={container}>
        {Object.entries(imagesDataParallaxScroll).map(([className, src]) => (
          <div key={className} className={`image ${className}`}>
            <Suspense fallback={<img alt="loading" />}>
              <img
                src={src.img}
                alt="wes anderson inspired"
                sizes={ImageSize.avatar}
                srcSet={src.srcSet}
                loading="lazy"
              />
            </Suspense>
          </div>
        ))}
      </div>
    </>
  );
}
