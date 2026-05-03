"use client";

import SahilSatpute from "@/components/svg/SahilSatpute.icon";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ParagraphGsap from "@/components/animations/paragraph-gsap/ParagraphGsap";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import useResponsive from "@/hooks/useResponsive.hook";
import { ImageSize } from "@/utils/image.util";

const heroImage = "https://ik.imagekit.io/exploresahil/sahil_hero_main.png";

const textOne =
  "I craft digital experiences, Turning pixels into possibilities.";

const textTwo =
  "I love to work on projects that have a strong visual identity and I believe that the best way to communicate with people is through imagery.";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HomeHeroProps {
  onReady?: () => void;
  /** True once the loader exit animation has fully completed. */
  canAnimate?: boolean;
}

const HomeHero = ({ onReady, canAnimate = false }: HomeHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroSvgRef = useRef<SVGSVGElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isDesktop } = useResponsive();
  const shouldUseMotion = useShouldUseMotion();
  const lenis = useLenis();

  const gsapStartValues = isDesktop ? "top 80%" : "top 70%";
  const gsapEndValues = isDesktop ? "bottom 70%" : "bottom 50%";

  // ── Handle Cached Image ──────────────────────────────────────────────────
  useEffect(() => {
    // If image is already cached/complete, trigger onReady manually
    const img = heroImgRef.current?.querySelector("img");
    if (img?.complete) {
      onReady?.();
    }
  }, [onReady]);

  // ── Initial hidden states and Entrance animation ─────────────────────────
  useGSAP(
    () => {
      // 1. Handle No-Motion or Immediate States
      if (!shouldUseMotion) {
        gsap.set(heroImgRef.current, { scale: 1 });
        gsap.set(heroSvgRef.current, { opacity: 1, scale: 1 });
        gsap.set(designationRef.current, { opacity: 1, y: 0 });

        if (canAnimate) {
          lenis?.start();
          document.documentElement.style.overflow = "";
          ScrollTrigger.refresh();
        }
        return;
      }

      // 2. Set initial hidden state for motion
      gsap.set(heroImgRef.current, { scale: 6, opacity: 1 });
      gsap.set(heroSvgRef.current, { opacity: 0, scale: 5 });
      gsap.set(designationRef.current, { opacity: 0, y: 20 });

      // 3. Play entrance animation only when allowed
      if (!canAnimate) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          lenis?.start();
          document.documentElement.style.overflow = "";
          // Force ScrollTrigger to recalculate positions now that layout is stable
          ScrollTrigger.refresh();
        },
      });

      tl.to(heroImgRef.current, { scale: 1, duration: 1 })
        .to(heroSvgRef.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(
          designationRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        );
    },
    { scope: heroRef, dependencies: [shouldUseMotion, canAnimate, lenis] },
  );

  // ── Scroll animations ──────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!shouldUseMotion) return;

      gsap.fromTo(
        heroImgRef.current,
        { scale: 1, immediateRender: false },
        {
          scale: 5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".hero_slide",
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        heroSvgRef.current,
        { scale: 1, opacity: 1, immediateRender: false },
        {
          scale: 5,
          opacity: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".hero_slide",
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        designationRef.current,
        { opacity: 1, y: 0, immediateRender: false },
        {
          opacity: 0,
          y: 20,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".hero_slide",
            start: "bottom bottom",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        bottomRef.current,
        {
          borderBottomRightRadius: "0%",
          borderBottomLeftRadius: "0%",
          background: "linear-gradient(0deg, black 0%, black 100%)",
        },
        {
          borderBottomRightRadius: "50%",
          borderBottomLeftRadius: "50%",
          background: "linear-gradient(0deg, #f5f5f5 0%, black 100%)",
          ease: "power1.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "bottom bottom",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    },
    { scope: heroRef, dependencies: [shouldUseMotion] },
  );

  // ── Mouse parallax animation ─────────────────────────────────────────────
  useGSAP(
    () => {
      if (!shouldUseMotion || !isDesktop) return;

      const xToImg = gsap.quickTo(heroImgRef.current, "x", {
        duration: 0.6,
        ease: "power3",
      });
      const xToSvg = gsap.quickTo(heroSvgRef.current, "x", {
        duration: 0.8,
        ease: "power3",
      });
      const yToSvg = gsap.quickTo(heroSvgRef.current, "y", {
        duration: 0.8,
        ease: "power3",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = clientX / window.innerWidth - 0.5;
        const yPos = clientY / window.innerHeight - 0.5;

        xToImg(xPos * 20);
        xToSvg(xPos * 50);
        yToSvg(yPos * 50);
      };

      globalThis.addEventListener("mousemove", handleMouseMove);
      return () => globalThis.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: heroRef, dependencies: [shouldUseMotion, isDesktop] },
  );

  return (
    <section id="HomeHero" ref={heroRef}>
      <div className="hero_slide">
        <SahilSatpute ref={heroSvgRef} />
        <div className="hero_img_container" ref={heroImgRef}>
          <Image
            src={heroImage}
            alt="Hero Image"
            fill
            sizes={ImageSize.banner}
            loading="eager"
            onLoad={onReady}
            onError={onReady} // Fallback to unlock loader if image fails
          />
        </div>
        <p className="designation" ref={designationRef}>
          Full Stack Designer
        </p>
      </div>
      {shouldUseMotion && (
        <>
          <ParagraphGsap
            className="text text_one"
            text={textOne}
            start={gsapStartValues}
            end={gsapEndValues}
            yStart={6}
            stagger={0.05}
            markers={false}
          />
          <ParagraphGsap
            className="text text_two"
            text={textTwo}
            start={gsapStartValues}
            end={gsapEndValues}
            yStart={6}
            stagger={0.05}
            markers={false}
          />
        </>
      )}
      {shouldUseMotion && <div className="bottom" ref={bottomRef}></div>}
    </section>
  );
};

export default HomeHero;
