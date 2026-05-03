import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import "./style.scss";

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
}) => {
  const MainRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ").map((word, index) => ({
    id: `word-${index}-${word}`,
    value: word,
  }));
  const shouldUseMotion = useShouldUseMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    if (bioRef.current && MainRef.current) {
      const spans = bioRef.current.querySelectorAll(".word-span");

      const animation = gsap.fromTo(
        spans,
        {
          y: shouldUseMotion ? yStart : 0,
          x: shouldUseMotion ? xStart : 0,
          opacity: shouldUseMotion ? 0 : 1,
        },
        {
          y: shouldUseMotion ? yEnd : 0,
          x: shouldUseMotion ? xEnd : 0,
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
        },
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
    shouldUseMotion,
  ]);

  return (
    <div className={`paragraph-gsap ${className}`} ref={MainRef}>
      <p ref={bioRef}>
        {words.map((word, index) => (
          <span key={word.id} className="word-span">
            {word.value}
            {index < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ParagraphGsap;
