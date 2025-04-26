"use client";

import "./style.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Star from "@/components/icon/star/Star";
import AnimatedText from "@/components/animation/animated-text/AnimatedText";

const PageNotFound = () => {
  const firstText = useRef<HTMLHeadingElement>(null);
  const secondText = useRef<HTMLHeadingElement>(null);
  const thirdText = useRef<HTMLHeadingElement>(null);

  const loop = [{ ref: firstText }, { ref: secondText }, { ref: thirdText }];

  let xPercent = 0;
  const direction = -1; // Direction for animation

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animation);
    return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
  }, []);

  const animation = () => {
    if (firstText.current && secondText.current && thirdText.current) {
      if (xPercent <= -100) {
        xPercent = 0;
      }
      gsap.set(firstText.current, { xPercent });
      gsap.set(secondText.current, { xPercent });
      gsap.set(thirdText.current, { xPercent });
      xPercent += 0.05 * direction;
      requestAnimationFrame(animation);
    }
  };

  return (
    <section id="notFound">
      <div className="slider_container">
        <div className="slider">
          {loop.map((item, i) => (
            <h2 key={`404-heading-${i}`} ref={item.ref}>
              {new Array(4).fill("").map((_, index) => (
                <span key={`404-${i}-star-${index}`}>
                  <Star size={50} position="relative" /> 404{" "}
                </span>
              ))}
            </h2>
          ))}
        </div>
      </div>
      <div className="text_container">
        <p>Page not found</p>
        <Link href="/">
          <AnimatedText text="Return Home" />
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
