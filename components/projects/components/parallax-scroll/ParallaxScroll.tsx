// ParallaxScroll.tsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useMemo } from "react";
import "./style.scss";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion";
import { getAnimationConfig } from "./anime";
import ProjectMotionWarning from "../motionWarning/ProjectMotionWarning";
import { imagesDataParallaxScroll } from "./db";
import useResponsive from "@/hooks/useResponsive";
import ImageSize from "@/utils/imageSize";

const ParallaxScroll = () => {
  const container = useRef<HTMLDivElement>(null);
  const shouldUseMotion = useShouldUseMotion();
  const { isMobile, isTablet, isDesktop, isXLarge } = useResponsive();

  // Recompute the animation config whenever the viewport category changes
  const animationConfig = useMemo(
    () =>
      getAnimationConfig({
        isMobile,
        isTablet,
        isDesktop,
        isXLarge,
      }),
    [isMobile, isTablet, isDesktop, isXLarge]
  );

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      if (!shouldUseMotion) return;

      Object.entries(animationConfig).forEach(([className, config]) => {
        // Animate container movement
        gsap.fromTo(
          `.${className}`,
          { y: config.y.from },
          {
            y: config.y.to,
            scrollTrigger: {
              trigger: container.current,
              start: config.scrollTrigger.start,
              end: config.scrollTrigger.end,
              scrub: true,
              markers: config.markers,
            },
          }
        );

        // Animate image objectPosition
        gsap.fromTo(
          `.${className} img`,
          { objectPosition: config.objectPosition.from },
          {
            objectPosition: config.objectPosition.to,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: container.current,
              start: config.scrollTrigger.start,
              end: config.scrollTrigger.end,
              scrub: true,
              markers: config.markers,
            },
          }
        );
      });
    },
    { scope: container, dependencies: [shouldUseMotion] }
  );

  return (
    <section id="ParallaxScroll">
      <ProjectMotionWarning />
      <div className="title">
        <h1>Explore Wes Anderson Inspired Gallery</h1>
      </div>
      <div className="images_container" ref={container}>
        {Object.entries(imagesDataParallaxScroll).map(([className, src]) => (
          <div key={className} className={`image ${className}`}>
            <img
              src={src}
              alt="wes anderson inspired"
              sizes={ImageSize.avatar}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxScroll;
