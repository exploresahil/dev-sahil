"use client";

import "./style.scss";
import { skillsData } from "@/database/skills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useEffect, useRef, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import CardTilt from "@/components/animation/card-tilt/CardTilt";
import TextHashTyping from "@/components/animation/text-hash-typing/TextHashTyping";
import { motion, useAnimation } from "motion/react";

const Skills = () => {
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const skillsContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const animationRefs = useRef<any[]>([]);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);

    animationRefs.current.forEach((animation) => {
      animation.scrollTrigger?.kill();
      animation.kill();
    });
    animationRefs.current = [];

    if (!titleRefs.current.length || !skillsContainerRefs.current.length)
      return;

    titleRefs.current.forEach((title, index) => {
      if (!title) return;

      const animation = gsap.fromTo(
        title,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: CustomEase.create("cubic-bezier", "0.45, 0, 0.55, 1"),
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "bottom 70%",
            //scrub: true,
          },
        }
      );

      animationRefs.current.push(animation);
    });

    skillsContainerRefs.current.forEach((container, categoryIndex) => {
      if (!container) return;

      const animation = gsap.fromTo(
        skillRefs.current[categoryIndex],
        { x: 50, y: 50, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          ease: CustomEase.create("cubic-bezier", "0.45, 0, 0.55, 1"),
          stagger: 0.05,
          duration: 0.25,
          scrollTrigger: {
            trigger: container,
            start: isTablet ? "top 90%" : "top 70%",
            end: isTablet ? "bottom 80%" : "bottom 60%",
            //markers: true,
            //scrub: true,
          },
        }
      );

      animationRefs.current.push(animation);
    });

    return () => {
      animationRefs.current.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
      animationRefs.current = [];
    };
  }, [isMobile, isTablet, isDesktop]);

  const titleControls = useAnimation();

  return (
    <section id="Skills">
      <div className="title">
        <motion.h2
          onViewportEnter={() => {
            if (!hasEnteredViewport) {
              setHasEnteredViewport(true);
              titleControls.set({ opacity: 0 });
              setTimeout(() => {
                titleControls.start("fadeIn");
                titleControls.start("visible");
              }, 300);
            }
          }}
        >
          <TextHashTyping
            text="Skills"
            controls={titleControls}
            blockBackgroundColor="#f5f5f7"
          />
        </motion.h2>
      </div>
      <div className="container">
        {skillsData.items.map((category, categoryIndex) => (
          <div
            className={`skill ${category.title.toLowerCase()}`}
            key={category.title}
          >
            <h3
              ref={(el) => {
                titleRefs.current[categoryIndex] = el;
              }}
            >
              {category.title}
            </h3>
            <div
              className="skills_container"
              ref={(el) => {
                skillsContainerRefs.current[categoryIndex] = el;
              }}
            >
              {category.items.map((skill, skillIndex) => (
                <div
                  className="skill_card"
                  key={skill.name}
                  title={skill.name}
                  ref={(el) => {
                    if (!skillRefs.current[categoryIndex]) {
                      skillRefs.current[categoryIndex] = [];
                    }
                    skillRefs.current[categoryIndex][skillIndex] = el;
                  }}
                >
                  <CardTilt>
                    <skill.component />
                  </CardTilt>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
