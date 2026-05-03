"use client";

import { useRef } from "react";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import ProjectWarning from "../../warning/ProjectWarning";

const text = "I craft digital experiences.";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ScrollTextReveal = () => {
  const scrollTextRevealRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion || !mainRef.current) return;

      const spans = mainRef.current.querySelectorAll(".anim_char");

      gsap.to(spans, {
        scale: 1,
        opacity: 1,
        rotateY: "0deg",
        rotateX: "0deg",
        scrollTrigger: {
          trigger: mainRef.current,
          //markers: true,
          scrub: 0.05,
          start: "top top",
          end: "bottom bottom",
        },
      });
    },
    { scope: scrollTextRevealRef, dependencies: [shouldUseMotion] },
  );

  return (
    <section id="ScrollTextReveal" ref={scrollTextRevealRef}>
      <ProjectWarning />

      <div className="filler">Scroll down to reveal the text</div>
      <div className="main" ref={mainRef}>
        <div className="text">
          <h2>
            {text.split(" ").map((word, index) => (
              <span key={`${word}`} className={`word word_${index + 1}`}>
                {word.split("").map((letter, i) => (
                  <span
                    key={`${letter}_${i + 1}`}
                    className={`anim_char char_${i + 1}`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
      </div>
      <div className="filler">Scroll up</div>
    </section>
  );
};

export default ScrollTextReveal;
