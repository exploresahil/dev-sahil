"use client";

import { useEffect, useRef } from "react";
import "./style.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const text = "I craft digital experiences.";

const ScrollTextReveal = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (mainRef.current) {
      const spans = mainRef.current.querySelectorAll(".anim-char");

      const animation = gsap.to(spans, {
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

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }
  }, []);

  return (
    <section id="ScrollTextReveal">
      <div className="filler">Scroll down to reveal the text</div>
      <div className="main" ref={mainRef}>
        <div className="text">
          <h2>
            {text.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`word word-${index + 1}`}
              >
                {word.split("").map((letter, i) => (
                  <span
                    key={`${letter}-${i}`}
                    className={`anim-char char-${i + 1}`}
                    ref={charRef}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
      </div>
      <div className="filler" />
    </section>
  );
};

export default ScrollTextReveal;
