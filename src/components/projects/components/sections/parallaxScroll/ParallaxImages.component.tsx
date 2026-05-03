import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useMemo, useRef } from "react";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import { ImageSize } from "@/utils/image.util";
import { getAnimationConfig } from "./parallaxConfig.anim";
import { imagesDataParallaxScroll } from "./parallaxImages.db";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ParallaxImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldUseMotion = useShouldUseMotion();

  const animationConfig = useMemo(() => getAnimationConfig(), []);

  useGSAP(
    () => {
      if (!shouldUseMotion) return;

      Object.entries(animationConfig).forEach(([className, config]) => {
        const triggerOpts = {
          trigger: containerRef.current,
          start: config.scrollTrigger.start,
          end: config.scrollTrigger.end,
          scrub: true,
          markers: config.markers,
        };
        gsap.fromTo(
          `.${className}`,
          { y: config.y.from },
          { y: config.y.to, scrollTrigger: triggerOpts },
        );
        gsap.fromTo(
          `.${className} img`,
          { objectPosition: config.objectPosition.from },
          {
            objectPosition: config.objectPosition.to,
            ease: "power1.inOut",
            scrollTrigger: triggerOpts,
          },
        );
      });
    },
    {
      scope: containerRef,
      dependencies: [shouldUseMotion],
    },
  );

  console.log("shouldUseMotion->", shouldUseMotion);
  return (
    <>
      <div className="title">
        <h1>Explore Wes Anderson Inspired Gallery</h1>
      </div>
      <div className="images_container" ref={containerRef}>
        {Object.entries(imagesDataParallaxScroll).map(([className, src]) => (
          <div key={className} className={`image ${className}`}>
            <Suspense fallback={<img src={src.img} alt="loading" />}>
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
};

export default ParallaxImages;
