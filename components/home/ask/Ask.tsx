"use client";

import "@/components/home/workflow/style.scss";
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
import askData from "@/database/ask";
import ImageCardTitle from "../imageCardTitle/ImageCardTitle";

const Ask = () => {
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
    <section id="Ask">
      <div className="left">
        <ImageCardTitle
          image="https://images.unsplash.com/photo-1516975426901-140825b3cf8b?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ref={imgContainerRef}
          scale={imgScale}
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
            text="Let's untangle your questions together!"
            controls={titleControls}
            blockBackgroundColor="#d92e1c"
          />
        </motion.h2>
        <Accordian data={askData} />
      </div>
    </section>
  );
};

export default Ask;
