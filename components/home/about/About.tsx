"use client";

import useResponsive from "@/hooks/useResponsive";
import "./style.scss";
import ParagraphGsap from "@/components/animation/paragraph-gsap/ParagraphGsap";
import { useRef } from "react";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion";

//*----------> Text Variables

const text =
  "I'm a developer with a passion for front-end development and design. I'm also a person who loves to take pictures and make things look pretty.";

const About = () => {
  const aboutSecRef = useRef<HTMLElement>(null);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  //*----------> gsap Values

  const gsapStartValues = isDesktop
    ? "top 70%"
    : isTablet
    ? "top 90%"
    : "top 55%";
  const gsapEndValues = isTablet ? "center 80%" : "center 55%";

  return (
    <section id="About">
      <ParagraphGsap
        className="text"
        text={text}
        start={gsapStartValues}
        end={gsapEndValues}
        xStart={20}
        //scrub={false}
        stagger={0.05}
        //markers={true}
      />
    </section>
  );
};

export default About;
