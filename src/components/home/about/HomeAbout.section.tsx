"use client";

import ParagraphGsap from "@/components/animations/paragraph-gsap/ParagraphGsap";
import "./style.scss";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import useResponsive from "@/hooks/useResponsive.hook";

const text =
  "I'm a developer with a passion for front-end development and design. I'm also a person who loves to take pictures and make things look pretty.";

const HomeAbout = () => {
  const { isTablet, isDesktop } = useResponsive();
  const shouldUseMotion = useShouldUseMotion();

  const tabletOrMobileStart = isTablet ? "top 90%" : "top 55%";
  const gsapStartValues = isDesktop ? "top 70%" : tabletOrMobileStart;
  const tabletOrMobileEnd = isTablet ? "center 80%" : "center 55%";
  const gsapEndValues = isDesktop ? "center 60%" : tabletOrMobileEnd;

  return (
    <section
      id="HomeAbout"
      style={shouldUseMotion ? { marginTop: "50vh" } : {}}
    >
      <ParagraphGsap
        className="text"
        text={text}
        start={gsapStartValues}
        end={gsapEndValues}
        xStart={20}
        //scrub={false}
        stagger={0.05}
        // markers={true}
      />
    </section>
  );
};

export default HomeAbout;
