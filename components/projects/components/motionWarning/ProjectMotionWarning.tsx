"use client";

import { useEffect, useState } from "react";
import "./style.scss";
import Link from "next/link";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";
import { X } from "lucide-react";

const ProjectMotionWarning = () => {
  const [open, setOpen] = useState(false);
  const shouldUseMotion = useShouldUseMotion();

  useEffect(() => {
    if (shouldUseMotion) {
      setOpen(true);
    }
  }, [shouldUseMotion]);

  if (!open) return null;

  //console.log("shouldUseMotion->", shouldUseMotion);

  return (
    <motion.section
      id="ProjectMotionWarning"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      onClick={() => setOpen(false)}
    >
      <motion.div
        className="warning_container"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title">
          <h1>Motion Sensitivity Warning</h1>
          <X size={24} onClick={() => setOpen(false)} />
        </div>
        <p>
          This page includes animations that could potentially cause discomfort
          for individuals with vestibular disorders, motion sensitivity, or
          migraines. Your well-being is important to us.
        </p>
        <p>
          If you experience motion sensitivity, you can turn off animations in
          your OS or browser settings under “Reduce Motion”.
        </p>
        <p>
          For more information visit{" "}
          <Link href="/reduce-motion-info">/reduce-motion-info</Link>
        </p>
      </motion.div>
    </motion.section>
  );
};

export default ProjectMotionWarning;
