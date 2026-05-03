"use client";

import React, { useEffect, useRef, useState } from "react";
import ProjectWarning from "../../warning/ProjectWarning";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Colors } from "@/utils/colors.utils";

const PixelCursorMove = () => {
  const [windowsWidth, setWindowsWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWindowsWidth(window.innerWidth);
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin();
    },
    { scope: containerRef },
  );

  const getBLocks = () => {
    const blockSize = windowsWidth * 0.05;
    const nbOfBlocks = Math.ceil(window.innerHeight / blockSize);
    const blocks: React.ReactNode[] = [];
    for (let i = 0; i < nbOfBlocks; i++) {
      blocks.push(
        React.createElement("div", {
          onMouseEnter: (e) => {
            colorize(e.target as HTMLElement);
          },
          key: `block-${i}`,
        }),
      );
    }
    return blocks;
  };

  const colorize = (el: HTMLElement) => {
    gsap.to(el, {
      backgroundColor: Colors.default_dark,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(el, {
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.in",
        });
      },
    });
  };

  return (
    <section id="PixelCursorMove">
      <ProjectWarning type="responsive" />
      <div className="body">
        <p>Where Ideas Take Shape and Pixels Find Purpose</p>
      </div>
      <div className="grid" ref={containerRef}>
        {windowsWidth > 0 &&
          (() => {
            const columns: React.ReactNode[] = [];
            for (let i = 0; i < 20; i++) {
              columns.push(
                React.createElement(
                  "div",
                  { key: `column-${i}`, className: "column" },
                  getBLocks(),
                ),
              );
            }
            return columns;
          })()}
      </div>
    </section>
  );
};

export default PixelCursorMove;
