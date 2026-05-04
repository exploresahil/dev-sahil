"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "projects" | "workflow" | "ask";

interface GeometricAnimationProps {
  animationType: AnimationType;
}

const colors = {
  primary: "#db2f27",
  secondary: "#e7c700",
  accent: "#008cbc",
  dark: "#131314",
  light: "#f5f5f7",
};

// Projects: Drawing inspiration (Path + Dots on corners)
const ProjectsAnimation = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion || !containerRef.current) return;

      const paths = containerRef.current.querySelectorAll(".proj-path");
      const dots = containerRef.current.querySelectorAll(".proj-dot");

      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center bottom",
          end: "center 55%",
          scrub: 1,
        },
      });

      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center bottom",
            end: "center 55%",
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [shouldUseMotion] },
  );

  useEffect(() => {
    const svg = containerRef.current;
    if (!svg || !shouldUseMotion) return;

    const dots = svg.querySelectorAll(".proj-dot");
    const handleMouseEnter = () => {
      gsap.to(dots, {
        scale: 1.5,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.inOut",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(dots, {
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      });
    };

    svg.addEventListener("mouseenter", handleMouseEnter);
    svg.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      svg.removeEventListener("mouseenter", handleMouseEnter);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldUseMotion]);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Projects - Drawing inspiration path"
      style={{ pointerEvents: "all" }}
    >
      <title>Projects drawing inspiration</title>
      <g transform="translate(200, 200) scale(1.3) translate(-200, -200)">
        <g stroke={colors.primary} strokeWidth="2" fill="none" opacity="0.8">
          <path
            className="proj-path"
            d="M 200 100 L 286.6 150 L 286.6 250 L 200 300 L 113.4 250 L 113.4 150 Z"
          />
          <path className="proj-path" d="M 200 200 L 200 100" />
          <path className="proj-path" d="M 200 200 L 286.6 250" />
          <path className="proj-path" d="M 200 200 L 113.4 250" />
        </g>
        <g fill={colors.dark}>
          <circle className="proj-dot" cx="200" cy="100" r="4.5" />
          <circle className="proj-dot" cx="286.6" cy="150" r="4.5" />
          <circle className="proj-dot" cx="286.6" cy="250" r="4.5" />
          <circle className="proj-dot" cx="200" cy="300" r="4.5" />
          <circle className="proj-dot" cx="113.4" cy="250" r="4.5" />
          <circle className="proj-dot" cx="113.4" cy="150" r="4.5" />
          <circle className="proj-dot" cx="200" cy="200" r="4.5" />
        </g>
      </g>
    </svg>
  );
};

// Workflow: Inferring intent.
const WorkflowAnimation = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion || !containerRef.current) return;

      const path = containerRef.current.querySelector(
        ".flow-line",
      ) as SVGPathElement;
      const orb = containerRef.current.querySelector(".orb");

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center bottom",
          end: "center 55%",
          scrub: 1,
        },
      });

      gsap.fromTo(
        orb,
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center 55%",
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [shouldUseMotion] },
  );

  useEffect(() => {
    const svg = containerRef.current;
    if (!svg || !shouldUseMotion) return;

    const orb = svg.querySelector(".orb");
    const path = svg.querySelector(".flow-line");

    const handleMouseEnter = () => {
      gsap.to(orb, {
        scale: 1.5,
        duration: 0.4,
        ease: "power2.out",
        fill: colors.secondary,
      });
      gsap.to(path, {
        strokeWidth: 6,
        opacity: 0.8,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(orb, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        fill: colors.primary,
      });
      gsap.to(path, { strokeWidth: 4, opacity: 1, duration: 0.4 });
    };

    svg.addEventListener("mouseenter", handleMouseEnter);
    svg.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      svg.removeEventListener("mouseenter", handleMouseEnter);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldUseMotion]);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Workflow - Inferring intent flow"
      style={{ pointerEvents: "all" }}
    >
      <title>Workflow inferring intent</title>
      <path
        className="flow-line"
        d="M 50 300 L 150 300 L 150 150 L 250 150 L 250 250 L 350 250"
        stroke={colors.dark}
        strokeWidth="4"
        fill="none"
        strokeLinejoin="miter"
      />
      <circle className="orb" cx="350" cy="250" r="15" fill={colors.primary} />
    </svg>
  );
};

// Ask: Interaction metaphors. Fix perspective. Add hover.
const AskAnimation = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion || !containerRef.current) return;

      const core = containerRef.current.querySelector(".core");
      const rings = containerRef.current.querySelectorAll(".ring");

      gsap.fromTo(
        core,
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center bottom",
            end: "center 55%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        rings,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center bottom",
            end: "center 55%",
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [shouldUseMotion] },
  );

  useEffect(() => {
    const svg = containerRef.current;
    if (!svg || !shouldUseMotion) return;

    const core = svg.querySelector(".core");
    const rings = svg.querySelectorAll(".ring");

    const handleMouseEnter = () => {
      gsap.to(core, { scale: 1.2, duration: 0.4, ease: "power2.inOut)" });
      gsap.to(rings, { strokeWidth: 4, duration: 0.4, ease: "power2.out" });
    };
    const handleMouseLeave = () => {
      gsap.to(core, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(rings, { strokeWidth: 2, duration: 0.4, ease: "power2.out" });
    };

    svg.addEventListener("mouseenter", handleMouseEnter);
    svg.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      svg.removeEventListener("mouseenter", handleMouseEnter);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldUseMotion]);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Ask - Interaction metaphors rings"
      style={{ pointerEvents: "all" }}
    >
      <title>Ask interaction</title>
      <circle
        className="ring"
        cx="200"
        cy="200"
        r="80"
        fill="none"
        stroke={colors.primary}
        strokeWidth="2"
      />
      <circle
        className="ring"
        cx="200"
        cy="200"
        r="120"
        fill="none"
        stroke={colors.secondary}
        strokeWidth="2"
      />
      <circle className="core" cx="200" cy="200" r="40" fill={colors.dark} />
    </svg>
  );
};

const GeometricAnimation = ({ animationType }: GeometricAnimationProps) => {
  switch (animationType) {
    case "projects":
      return <ProjectsAnimation />;
    case "ask":
      return <AskAnimation />;
    case "workflow":
      return <WorkflowAnimation />;
    default:
      return null;
  }
};

export default GeometricAnimation;
