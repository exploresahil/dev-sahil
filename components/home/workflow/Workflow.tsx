"use client";

import "./style.scss";
import { useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useAnimation,
  useScroll,
  useTransform,
} from "motion/react";
import TextHashTyping from "@/components/animation/text-hash-typing/TextHashTyping";
import Accordian from "@/components/accordian/Accordian";
import WorkflowData from "@/database/workflow";
import Noise from "@/components/animation/noise/Noise";
import ImageCardTitle from "../imageCardTitle/ImageCardTitle";

const Workflow = () => {
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  const imgContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgContainerRef,
    offset: ["start end", "start 0.15"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [4, 1], {
    ease: cubicBezier(0.5, 1, 0.89, 1),
  });

  const titleControls = useAnimation();

  return (
    <section id="Workflow">
      <div className="left">
        <ImageCardTitle
          image="https://images.unsplash.com/photo-1639395241103-9c855f93a90c?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ref={imgContainerRef}
          scale={imgScale}
          style={{
            objectPosition: "50% 60%",
          }}
        />
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
            text="Workflow"
            controls={titleControls}
            blockBackgroundColor="#d92e1c"
          />
        </motion.h2>
        <Accordian data={WorkflowData} />
      </div>
    </section>
  );
};

export default Workflow;
