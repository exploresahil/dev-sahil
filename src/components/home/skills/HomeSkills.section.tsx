"use client";

import "./style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import { skillsData } from "./skills.db";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomeSkills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion) return;

      gsap.fromTo(
        ".skills_label",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills_label",
            start: "top 88%",
          },
        },
      );

      for (const el of gsap.utils.toArray<HTMLElement>(
        ".skills_category_title",
      )) {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          },
        );
      }

      ScrollTrigger.batch(".skill_item", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.04,
            },
          );
        },
        start: "top 92%",
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [shouldUseMotion] },
  );

  return (
    <section id="HomeSkills" ref={sectionRef}>
      <p
        className="skills_label section_title"
        style={{ opacity: shouldUseMotion ? 0 : 1 }}
      >
        Skills
      </p>
      <div className="skills_categories">
        {skillsData.items.map((category) => (
          <div className="skills_category" key={category.title}>
            <p
              className="skills_category_title"
              style={{ opacity: shouldUseMotion ? 0 : 1 }}
            >
              {category.title}
            </p>
            <ul className="skills_grid">
              {category.items.map((item) => {
                const Icon = item.component;
                return (
                  <li
                    className="skill_item"
                    style={{ opacity: shouldUseMotion ? 0 : 1 }}
                    key={item.name}
                  >
                    <span className="skill_icon">
                      <Icon />
                    </span>
                    <span className="skill_name">{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeSkills;
