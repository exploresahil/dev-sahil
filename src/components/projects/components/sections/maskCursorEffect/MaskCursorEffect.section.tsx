"use client";

import { useRef } from "react";
import ProjectWarning from "../../warning/ProjectWarning";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { pxToRem } from "@/utils/pxToRem.util";

gsap.registerPlugin(useGSAP);

const MaskCursorEffect = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      let isExpanded = false;
      let isVisible = false;

      const maskElement = maskRef.current;
      if (!maskElement) return;

      const h2Element = maskElement.querySelector("h2");
      if (!h2Element) return;

      // Set initial state (NO top-left glitch)
      gsap.set(maskElement, {
        maskSize: "0px",
        maskPosition: "0px 0px",
        opacity: 0,
      });

      const handleMouseMove = (e: MouseEvent) => {
        const container = maskElement.parentElement;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const offsetX = e.clientX - containerRect.left;
        const offsetY = e.clientY - containerRect.top;

        // Show mask on first movement (no jump)
        if (!isVisible) {
          isVisible = true;

          gsap.set(maskElement, {
            maskSize: pxToRem(20),
            maskPosition: `${offsetX - 10}px ${offsetY - 10}px`,
            opacity: 1,
          });
        }

        const { left, top, width, height } = h2Element.getBoundingClientRect();

        const isMouseOverH2 =
          e.clientX >= left &&
          e.clientX <= left + width &&
          e.clientY >= top &&
          e.clientY <= top + height;

        // Animate ONLY on state change
        if (isMouseOverH2 && !isExpanded) {
          isExpanded = true;

          gsap.to(maskElement, {
            maskSize: pxToRem(260),
            duration: 0.3,
            ease: "power2.out",
          });
        } else if (!isMouseOverH2 && isExpanded) {
          isExpanded = false;

          gsap.to(maskElement, {
            maskSize: pxToRem(20),
            duration: 0.3,
            ease: "power2.out",
          });
        }

        const currentMaskSize = isExpanded ? 260 : 20;

        const newXPos = offsetX - currentMaskSize / 2;
        const newYPos = offsetY - currentMaskSize / 2;

        gsap.to(maskElement, {
          maskPosition: `${newXPos}px ${newYPos}px`,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        isExpanded = false;
        isVisible = false;

        gsap.to(maskElement, {
          maskSize: "0px",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      sectionRef.current?.addEventListener("mousemove", handleMouseMove);
      sectionRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
        sectionRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="MaskCursorEffect" ref={sectionRef}>
      <ProjectWarning type="responsive" />

      <div className="container">
        <div className="body">
          <h2>
            I craft <br />
            digital <br />
            experiences,
          </h2>
        </div>

        <div className="mask" ref={maskRef}>
          <h2>
            Turning <br />
            pixels into <br />
            possibilities.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default MaskCursorEffect;
