"use client";
import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import useResponsive from "@/hooks/useResponsive.hook";

interface Props {
  text: string;
}

const AnimatedText = ({ text }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { isLaptop } = useResponsive();

  const words = text.split(" ").map((word, wordIdx) => ({
    id: `word-${wordIdx}-${word}`,
    letters: word.split("").map((letter, letterIdx) => ({
      id: `char-${wordIdx}-${letterIdx}-${letter}`,
      value: letter,
    })),
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  const letterVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: [0, -4, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants: Variants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const baseStyle = { display: "flex", gap: "3px", width: "max-content" };

  if (!mounted) return;

  return (
    <span style={baseStyle}>
      {isLaptop ? (
        <motion.span
          className="animated_text"
          initial="initial"
          whileHover="hover"
          variants={containerVariants}
          style={{ display: "flex", gap: "0.25rem" }}
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={word.id}
              className="anim-word"
              style={{ display: "flex" }}
            >
              {word.letters.map((letter) => (
                <motion.span
                  key={letter.id}
                  variants={letterVariants}
                  className="anim-char"
                  style={{ display: "block" }}
                >
                  {letter.value}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </motion.span>
      ) : (
        text
      )}
    </span>
  );
};

export default AnimatedText;
