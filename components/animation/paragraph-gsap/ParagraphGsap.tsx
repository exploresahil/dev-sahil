import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

const ParagraphGsap = ({
  text,
  className,
  start,
  end,
  markers = false,
  scrub = 0.02,
  stagger = 0.05,
  yStart = 20,
  yEnd = 0,
  xStart = 0,
  xEnd = 0,

  responsive = { isDesktop: false, isTablet: false, isMobile: true },
}: {
  text: string;
  className: string;
  start: string;
  end: string;
  markers?: boolean;
  scrub?: number | boolean;
  stagger?: number;
  yStart?: number;
  yEnd?: number;
  xStart?: number;
  xEnd?: number;
  responsive?: {
    isDesktop?: boolean;
    isTablet?: boolean;
    isMobile?: boolean;
  };
}) => {
  const MainRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement | any>(null);
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    if (bioRef.current && MainRef.current) {
      const spans = bioRef.current.querySelectorAll("span");

      const animation = gsap.fromTo(
        spans,
        {
          y: yStart,
          x: xStart,
          opacity: 0,
        },
        {
          y: yEnd,
          x: xEnd,
          opacity: 1,
          stagger,
          ease: CustomEase.create("cubic-bezier", "0.45, 0, 0.55, 1"),
          scrollTrigger: {
            trigger: MainRef.current,
            markers: markers,
            scrub,
            start,
            end,
          },
        }
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }
  }, [
    yStart,
    yEnd,
    xStart,
    xEnd,
    stagger,
    scrub,
    start,
    end,
    markers,
    responsive,
  ]);

  return (
    <div className={className} ref={MainRef}>
      <p ref={bioRef}>
        {words.map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </p>
    </div>
  );
};

export default ParagraphGsap;
