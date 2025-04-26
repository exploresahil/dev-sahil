"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import "./style.scss";
import { motion, useScroll, useTransform } from "motion/react";
import useResponsive from "@/hooks/useResponsive";
import ParagraphGsap from "@/components/animation/paragraph-gsap/ParagraphGsap";

//*----------> Text Variables

const title = "Sahil Satpute";
const subtitle = "Full Stack Designer";
const textOne =
  "I craft digital experiences, Turning pixels into possibilities.";
const textTwo =
  "I love to work on projects that have a strong visual identity and I believe that the best way to communicate with people is through imagery.";
const sahilImg =
  "https://ik.imagekit.io/exploresahil/tr:w-400/image-sahil-anime.png";
const sahilimageSrcSet =
  "https://ik.imagekit.io/exploresahil/tr:w-400/image-sahil-anime.png 820w, https://ik.imagekit.io/exploresahil/tr:w-820/image-sahil-anime.png 1025w, https://ik.imagekit.io/exploresahil/tr:w-820/image-sahil-anime.png 2040w";

const Hero = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    setMounted(true);
  }, []);

  //*----------> Framer Motion useScroll

  const { scrollYProgress } = useScroll({
    target: topRef,
    offset: ["end end", "1 0"],
  });

  const { scrollYProgress: bottomBgScroll } = useScroll({
    target: bottomref,
    offset: ["start end", "start start"],
  });

  //*----------> Initial Values for SSR
  const initialWidth = "30%";
  const initialHeight = "70%";

  //*----------> Framer Motion useTransform Values

  const textValues = [
    0,
    mounted ? (isDesktop ? 500 : isTablet ? 620 : 365) : 500,
  ];
  const windowWidthValues = [
    mounted ? (isDesktop ? "30%" : isTablet ? "60%" : "90%") : initialWidth,
    "100%",
  ];
  const windowHeightValues = [
    mounted ? (isDesktop ? "70%" : isTablet ? "60%" : "60%") : initialHeight,
    "20%",
  ];

  //*----------> Framer Motion useTransform

  const yText = useTransform(scrollYProgress, [0, 1], textValues);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const borderBg = useTransform(scrollYProgress, [0, 1], ["500px", "0px"]);
  const windowHeight = useTransform(
    scrollYProgress,
    [0, 1],
    windowHeightValues
  );
  const windowWidth = useTransform(
    scrollYProgress,
    [0, 0.5],
    windowWidthValues
  );
  const bottomBgWidth = useTransform(
    bottomBgScroll,
    [0, 0.5],
    windowWidthValues
  );
  const subTitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  //*----------> gsap Values

  const gsapStartValues = isDesktop ? "top 80%" : "top 55%";
  const gsapEndValues = isDesktop ? "botton 70%" : "bottom 45%";

  const titleArray = title.split(" ");

  return (
    <section id="Hero">
      <div className="top" ref={topRef}>
        <div className="hero_content">
          <motion.h1
            variants={containerVariants}
            initial="initial"
            animate="animate"
            style={{
              y: yText,
            }}
          >
            {titleArray.map((word, index) => (
              <motion.span key={index} variants={itemVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            className="window"
            style={{
              height: windowHeight,
              width: windowWidth,
              borderTopLeftRadius: borderBg,
              borderTopRightRadius: borderBg,
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.3 },
            }}
          />
        </div>
      </div>
      <motion.h2
        style={{
          opacity: subTitleOpacity,
        }}
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.7 },
        }}
      >
        {subtitle}
      </motion.h2>
      <Suspense fallback={<p>Loading...</p>}>
        <motion.div
          className="sahil_img"
          initial={{ opacity: 0, y: 50, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{
            scale: scaleImage,
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <img
            src={sahilImg}
            alt="sahil"
            className="anime"
            srcSet={sahilimageSrcSet}
          />
        </motion.div>
      </Suspense>
      <div className="bottom" ref={bottomref}>
        <motion.div
          className="bg"
          style={{
            width: bottomBgWidth,
          }}
        />
        <ParagraphGsap
          className="text_one"
          text={textOne}
          start={gsapStartValues}
          end={gsapEndValues}
          yStart={6}
          scrub={false}
          stagger={0.01}
          //markers={true}
          responsive={{ isDesktop, isTablet, isMobile }}
        />
        <ParagraphGsap
          className="text_two"
          text={textTwo}
          start={gsapStartValues}
          end={gsapEndValues}
          yStart={6}
          scrub={false}
          stagger={0.02}
          //markers={true}
          responsive={{ isDesktop, isTablet, isMobile }}
        />
      </div>
    </section>
  );
};

export default Hero;
