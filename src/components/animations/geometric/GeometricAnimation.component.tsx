"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "projects" | "ask" | "workflow";

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

const ProjectsAnimation = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion || !containerRef.current) return;

      const shapes = containerRef.current.querySelectorAll(".project-shape");
      const connections =
        containerRef.current.querySelectorAll(".connection-line");
      const dots = containerRef.current.querySelectorAll("circle");

      gsap.fromTo(
        shapes,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        connections,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.6,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        },
      );

      gsap.to(dots, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(shapes, {
        y: (i) => (i % 2 === 0 ? 20 : -20),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef, dependencies: [shouldUseMotion] },
  );

  useEffect(() => {
    const svg = containerRef.current;
    if (!svg || !shouldUseMotion) return;

    const handleMouseEnter = () => {
      const shapes = svg.querySelectorAll(".project-shape");
      gsap.to(shapes, {
        scale: 1.1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeave = () => {
      const shapes = svg.querySelectorAll(".project-shape");
      gsap.to(shapes, {
        scale: 1,
        duration: 0.4,
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
      aria-label="Projects - Interaction Metaphors geometric animation"
      style={{ pointerEvents: "all" }}
    >
      <title>Projects geometric animation</title>
      <defs>
        <linearGradient id="projectGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="projectGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <rect
        className="project-shape float-random"
        x="60"
        y="60"
        width="100"
        height="80"
        rx="8"
        fill="url(#projectGrad1)"
        transform="rotate(-10 110 100)"
      />
      <rect
        className="project-shape float-random"
        x="180"
        y="40"
        width="120"
        height="90"
        rx="10"
        fill="url(#projectGrad2)"
      />
      <rect
        className="project-shape float-random"
        x="80"
        y="180"
        width="90"
        height="100"
        rx="6"
        fill={colors.accent}
        fillOpacity="0.5"
        transform="rotate(5 125 230)"
      />
      <rect
        className="project-shape float-random"
        x="200"
        y="160"
        width="110"
        height="85"
        rx="12"
        fill={colors.primary}
        fillOpacity="0.4"
      />
      <rect
        className="project-shape float-random"
        x="140"
        y="280"
        width="130"
        height="70"
        rx="8"
        fill={colors.secondary}
        fillOpacity="0.6"
        transform="rotate(-8 205 315)"
      />

      <line
        className="connection-line"
        x1="160"
        y1="100"
        x2="180"
        y2="85"
        stroke={colors.dark}
        strokeWidth="2"
      />
      <line
        className="connection-line"
        x1="170"
        y1="130"
        x2="170"
        y2="180"
        stroke={colors.dark}
        strokeWidth="2"
      />
      <line
        className="connection-line"
        x1="260"
        y1="130"
        x2="200"
        y2="160"
        stroke={colors.dark}
        strokeWidth="2"
      />
      <line
        className="connection-line"
        x1="140"
        y1="200"
        x2="200"
        y2="200"
        stroke={colors.dark}
        strokeWidth="2"
      />
      <line
        className="connection-line"
        x1="200"
        y1="245"
        x2="205"
        y2="280"
        stroke={colors.dark}
        strokeWidth="2"
      />

      <circle
        cx="110"
        cy="85"
        r="8"
        fill={colors.light}
        fillOpacity="0.8"
        className="float-up"
      />
      <circle
        cx="240"
        cy="60"
        r="6"
        fill={colors.light}
        fillOpacity="0.8"
        className="float-up-fast"
      />
      <circle
        cx="100"
        cy="220"
        r="7"
        fill={colors.light}
        fillOpacity="0.8"
        className="float-down"
      />
      <circle
        cx="255"
        cy="180"
        r="9"
        fill={colors.light}
        fillOpacity="0.8"
        className="float-up-slow"
      />
      <circle
        cx="180"
        cy="330"
        r="5"
        fill={colors.light}
        fillOpacity="0.8"
        className="float-up"
      />
    </svg>
  );
};

const AskAnimation = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion || !containerRef.current) return;

      const nodes = containerRef.current.querySelectorAll(".ergo-node");
      const connections =
        containerRef.current.querySelectorAll(".ergo-connection");
      const dots = containerRef.current.querySelectorAll(
        "circle:not(.ergo-node)",
      );

      gsap.fromTo(
        nodes,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        },
      );

      gsap.set(connections, { strokeDashoffset: 0 });

      gsap.to(nodes, {
        scale: 1.1,
        transformOrigin: "center center",
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.3,
          from: "random",
        },
        ease: "sine.inOut",
      });

      gsap.to(nodes, {
        y: (i) => (i % 2 === 0 ? 25 : -25),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(connections, {
        strokeDashoffset: "+=50",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(dots, {
        y: -40,
        x: (i) => (i % 3 === 0 ? 15 : -15),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef, dependencies: [shouldUseMotion] },
  );

  useEffect(() => {
    const svg = containerRef.current;
    if (!svg || !shouldUseMotion) return;

    const handleMouseEnter = () => {
      const nodes = svg.querySelectorAll(".ergo-node");
      gsap.to(nodes, {
        scale: 1.2,
        transformOrigin: "center center",
        duration: 0.4,
        stagger: { each: 0.1, from: "center" },
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeave = () => {
      const nodes = svg.querySelectorAll(".ergo-node");
      gsap.to(nodes, {
        scale: 1,
        transformOrigin: "center center",
        duration: 0.4,
        stagger: { each: 0.08, from: "center" },
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
      aria-label="Ask - Ergonomic Interactions geometric animation"
    >
      <title>Ask geometric animation</title>
      <defs>
        <radialGradient id="ergoGrad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="ergoGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="ergoGrad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.2" />
        </radialGradient>
      </defs>

      <circle
        className="ergo-node float-random"
        cx="200"
        cy="200"
        r="50"
        fill={colors.secondary}
        fillOpacity="0.5"
      />
      <circle
        className="ergo-node float-random"
        cx="100"
        cy="120"
        r="35"
        fill={colors.primary}
        fillOpacity="0.5"
      />
      <circle
        className="ergo-node float-random"
        cx="300"
        cy="140"
        r="40"
        fill={colors.primary}
        fillOpacity="0.5"
      />
      <circle
        className="ergo-node float-random"
        cx="80"
        cy="280"
        r="30"
        fill={colors.secondary}
        fillOpacity="0.5"
      />
      <circle
        className="ergo-node float-random"
        cx="320"
        cy="270"
        r="45"
        fill={colors.secondary}
        fillOpacity="0.4"
      />
      <circle
        className="ergo-node float-random"
        cx="200"
        cy="340"
        r="25"
        fill={colors.primary}
        fillOpacity="0.5"
      />

      <path
        className="ergo-connection"
        d="M150 150 Q 175 175, 200 200"
        stroke={colors.accent}
        strokeWidth="2"
        strokeDasharray="200"
        fill="none"
        opacity="0.6"
      />
      <path
        className="ergo-connection"
        d="M250 160 Q 225 180, 200 200"
        stroke={colors.accent}
        strokeWidth="2"
        strokeDasharray="200"
        fill="none"
        opacity="0.6"
      />
      <path
        className="ergo-connection"
        d="M110 280 Q 155 250, 200 200"
        stroke={colors.accent}
        strokeWidth="2"
        strokeDasharray="200"
        fill="none"
        opacity="0.6"
      />
      <path
        className="ergo-connection"
        d="M290 280 Q 245 240, 200 200"
        stroke={colors.accent}
        strokeWidth="2"
        strokeDasharray="200"
        fill="none"
        opacity="0.6"
      />
      <path
        className="ergo-connection"
        d="M200 315 Q 200 270, 200 225"
        stroke={colors.accent}
        strokeWidth="2"
        strokeDasharray="200"
        fill="none"
        opacity="0.6"
      />

      <circle
        cx="100"
        cy="110"
        r="10"
        fill={colors.dark}
        fillOpacity="0.5"
        className="float-up"
      />
      <circle
        cx="200"
        cy="200"
        r="15"
        fill={colors.dark}
        fillOpacity="0.5"
        className="float-down"
      />
      <circle
        cx="300"
        cy="120"
        r="12"
        fill={colors.dark}
        fillOpacity="0.5"
        className="float-up-fast"
      />
      <circle
        cx="90"
        cy="300"
        r="12"
        fill={colors.dark}
        fillOpacity="0.5"
        className="float-up-slow"
      />
      <circle
        cx="300"
        cy="290"
        r="12"
        fill={colors.dark}
        fillOpacity="0.5"
        className="float-down"
      />
      <circle
        cx="200"
        cy="340"
        r="12"
        fill={colors.dark}
        fillOpacity="0.5"
        className="float-up"
      />
    </svg>
  );
};

const WorkflowAnimation = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const shouldUseMotion = useShouldUseMotion();

  useGSAP(
    () => {
      if (!shouldUseMotion || !containerRef.current) return;

      const paths = containerRef.current.querySelectorAll(".flow-path");
      const arrows = containerRef.current.querySelectorAll(".flow-arrow");
      const dots = containerRef.current.querySelectorAll("circle");

      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        });
      });

      gsap.fromTo(
        arrows,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        },
      );

      gsap.to(paths, {
        x: (i) => (i % 2 === 0 ? 20 : -20),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      const getDotYOffset = (i: number): number => {
        const mod3 = i % 3;
        if (mod3 === 0) return 30;
        if (mod3 === 1) return -20;
        return 10;
      };

      gsap.to(dots, {
        y: (i) => getDotYOffset(i),
        x: (i) => (i % 2 === 0 ? 15 : -15),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      containerRef.current?.addEventListener("mouseenter", () => {
        if (!shouldUseMotion) return;
        gsap.to(dots, {
          scale: 1.3,
          transformOrigin: "center center",
          duration: 0.3,
          stagger: 0.05,
          ease: "back.out(2)",
        });
        gsap.to(paths, {
          strokeWidth: "+=2",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      containerRef.current?.addEventListener("mouseleave", () => {
        if (!shouldUseMotion) return;
        gsap.to(dots, {
          scale: 1,
          transformOrigin: "center center",
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });
        gsap.to(paths, {
          strokeWidth: "-=2",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef, dependencies: [shouldUseMotion] },
  );

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Workflow - Inferring Intent geometric animation"
    >
      <title>Workflow geometric animation</title>
      <defs>
        <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
          <stop offset="50%" stopColor={colors.primary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.2" />
          <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.2" />
        </linearGradient>
        <marker
          id="arrowhead1"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={colors.primary}
            opacity="0.8"
          />
        </marker>
        <marker
          id="arrowhead2"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={colors.secondary}
            opacity="0.8"
          />
        </marker>
      </defs>

      <path
        className="flow-path"
        d="M 50 200 Q 125 100, 200 200 T 350 200"
        stroke="url(#flowGrad1)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="flow-path"
        d="M 50 250 Q 150 150, 250 250 T 350 250"
        stroke="url(#flowGrad2)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="flow-path"
        d="M 50 300 Q 100 220, 150 300 T 250 300"
        stroke={colors.accent}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      <path
        className="flow-path"
        d="M 80 80 Q 160 60, 200 100 T 320 80"
        stroke={colors.accent}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        className="flow-path"
        d="M 80 350 Q 180 330, 280 350"
        stroke={colors.accent}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />

      <polygon
        className="flow-arrow"
        points="345,200 355,195 355,205"
        fill={colors.primary}
        opacity="0.8"
      />
      <polygon
        className="flow-arrow float-arrow"
        points="345,250 355,245 355,255"
        fill={colors.secondary}
        opacity="0.8"
      />

      <circle
        cx="200"
        cy="200"
        r="12"
        fill={colors.primary}
        opacity="0.9"
        className="float-diagonal"
      />
      <circle
        cx="100"
        cy="150"
        r="8"
        fill={colors.secondary}
        opacity="0.7"
        className="float-up"
      />
      <circle
        cx="300"
        cy="150"
        r="8"
        fill={colors.secondary}
        opacity="0.7"
        className="float-down"
      />
      <circle
        cx="150"
        cy="250"
        r="6"
        fill={colors.accent}
        opacity="0.6"
        className="float-up-fast"
      />
      <circle
        cx="250"
        cy="250"
        r="6"
        fill={colors.accent}
        opacity="0.6"
        className="float-up-slow"
      />
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
