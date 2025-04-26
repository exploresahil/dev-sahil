"use client";

import "./style.scss";
import { AnimationControls, motion } from "motion/react";

const text = "Sahil Satpute";

type Props = {
  text: string;
  blockBackgroundColor?: string;
  controls: AnimationControls;
};

const TextHashTyping = ({
  text,
  blockBackgroundColor = "#1d1d1f",
  controls,
}: Props) => {
  const letterAnimation = {
    fadeOut: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
    fadeIn: (i: number) => ({
      opacity: [0, 1],
      transition: {
        delay: i * 0.05,
        duration: 0.1,
        ease: "easeInOut",
      },
    }),
  };

  const blockAnimation = {
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      transition: {
        delay: i * 0.05,
        duration: 0.1,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <span id="TextHashTyping">
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="word"
          style={{ display: "inline-block", marginRight: "8px" }}
        >
          {word.split("").map((letter, letterIndex) => {
            const delay =
              (wordIndex * text.split(" ")[0].length + letterIndex) * 0.05;

            return (
              <span key={letterIndex} className="letters">
                <motion.span
                  className="letter"
                  custom={letterIndex}
                  variants={{
                    fadeOut: letterAnimation.fadeOut,
                    fadeIn: {
                      ...letterAnimation.fadeIn(letterIndex),
                      transition: {
                        ...letterAnimation.fadeIn(letterIndex).transition,
                        delay,
                      },
                    },
                  }}
                  animate={controls}
                >
                  {letter}
                </motion.span>
                <motion.span
                  className="block"
                  style={{
                    backgroundColor: blockBackgroundColor,
                  }}
                  custom={letterIndex}
                  variants={{
                    ...blockAnimation,
                    visible: {
                      ...blockAnimation.visible(letterIndex),
                      transition: {
                        ...blockAnimation.visible(letterIndex).transition,
                        delay,
                      },
                    },
                  }}
                  animate={controls}
                />
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default TextHashTyping;
