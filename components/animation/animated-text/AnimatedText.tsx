"use client";
import useResponsive from "@/hooks/useResponsive";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Props {
  text: string;
}

const AnimatedText = ({ text }: Props) => {
  const [mounted, setMounted] = useState(false);

  const { breakpoint } = useResponsive();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const words = text.split(" ").map((word) => word.split(""));
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsLargeScreen(breakpoint === "large");
  }, [breakpoint, mounted]);

  const letterVariants = {
    initial: {
      y: 0,
    },
    hover: {
      y: [0, -2, 0],
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const baseStyle = { display: "flex", gap: "3px", width: "max-content" };

  if (!mounted) return;

  return (
    <span style={baseStyle}>
      {isLargeScreen ? (
        <motion.span
          className="animated_text"
          initial="initial"
          whileHover="hover"
          variants={containerVariants}
          style={{
            display: "flex",
            gap: "0.25rem",
          }}
        >
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="anim-word"
              style={{ display: "flex" }}
            >
              {word.map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  variants={letterVariants}
                  className="anim-char"
                  style={{ display: "block" }}
                >
                  {letter}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && " "}
            </span>
          ))}
        </motion.span>
      ) : (
        text
      )}
    </span>
  );
};

export default AnimatedText;
