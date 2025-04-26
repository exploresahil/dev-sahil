"use client";

import {
  cubicBezier,
  motion,
  useAnimation,
  useScroll,
  useTransform,
} from "motion/react";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projectsData } from "@/database/projects";
import { MoveRight } from "lucide-react";
import TextHashTyping from "@/components/animation/text-hash-typing/TextHashTyping";
import useResponsive from "@/hooks/useResponsive";
import Noise from "@/components/animation/noise/Noise";
import { usePathname } from "next/navigation";

const Projects = () => {
  const { isDesktop } = useResponsive();
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imgContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgContainerRef,
    offset: ["start end", "start 0.15"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [4, 1], {
    ease: cubicBezier(0.5, 1, 0.89, 1),
  });

  const titleControls = useAnimation();

  const pathname = usePathname();

  const projectsStyle = {
    marginTop: pathname === "/projects" ? "5rem" : "0",
  };

  return (
    <section id="Projects" style={projectsStyle}>
      <div className="left">
        <div className="img_container" ref={imgContainerRef}>
          <motion.img
            src="https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Projects cover"
            style={{
              scale: imgScale,
            }}
          />
          <Noise />
        </div>
      </div>
      <div className="right">
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
            text="Projects"
            controls={titleControls}
            blockBackgroundColor="#d92e1c"
          />
        </motion.h2>
        {projectsData.map((project, i) => {
          const controls = useAnimation();
          return (
            <motion.div
              key={`${project.title}-${i}`}
              className="link"
              onHoverStart={() => {
                if (isDesktop) {
                  controls.start("fadeOut").then(() => {
                    controls.start("fadeIn");
                    controls.start("visible");
                  });
                }
              }}
              onViewportEnter={() => {
                controls.set({ opacity: 0 });
                setTimeout(() => {
                  controls.start("fadeIn");
                  controls.start("visible");
                }, 300);
              }}
            >
              <Link href={project.link}>
                <motion.p
                  whileInView={{
                    y: [10, 0],
                    opacity: [0, 1],
                    transition: {
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="i"
                >
                  {i + 1}
                </motion.p>
                <div className="title">
                  <h3>
                    <TextHashTyping
                      text={project.title}
                      controls={controls}
                      //blockBackgroundColor="#d92e1c"
                    />
                  </h3>
                  <motion.p
                    whileInView={{
                      opacity: [0, 1],
                      transition: {
                        delay: i * 0.05,
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {project.description}
                  </motion.p>
                </div>
                <motion.div
                  whileInView={{
                    x: [-10, 0],
                    opacity: [0, 1],
                    transition: {
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="svg"
                >
                  <MoveRight />
                </motion.div>
              </Link>
              {isDesktop && mounted && <div className="hover_bg" />}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
