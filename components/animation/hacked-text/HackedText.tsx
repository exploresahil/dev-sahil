"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

interface HackedTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  animateOnLoad?: boolean;
}

const alphabets = "abcdefghijklmnopqrstuvwxyz#@!$%&*+-".split("");
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const HackedText = ({
  text,
  duration = 800,
  animateOnLoad = true,
}: HackedTextProps) => {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);
  const hasAnimated = useRef(false);
  const hackedTextRef = useRef<HTMLSpanElement>(null);

  const triggerAnimation = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }
      if (interations.current < text.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= interations.current
              ? text[i]
              : alphabets[getRandomInt(26)]
          )
        );
        interations.current += 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (text.length * 10));

    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);

    if (hackedTextRef.current) {
      const hackedText = hackedTextRef.current;

      const animation = gsap.fromTo(
        hackedText,
        {
          opacity: 0,
          x: 200,
        },
        {
          opacity: 1,
          x: 0,
          ease: CustomEase.create("cubic-bezier", "0.45, 0, 0.55, 1"),
          scrollTrigger: {
            trigger: hackedText,
            // markers: true,
            start: "top 75%",
            end: "bottom 75%",
            // scrub: true,
            onEnter: triggerAnimation,
          },
        }
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }
  }, []);

  return (
    <span ref={hackedTextRef} id="HackedText">
      <AnimatePresence>
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.05 * i }}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
};

export default HackedText;
