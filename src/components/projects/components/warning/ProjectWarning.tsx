"use client";

import { useEffect, useState } from "react";
import "./style.scss";
import { X } from "lucide-react";
import { motion } from "motion/react";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import useResponsive from "@/hooks/useResponsive.hook";

const ProjectWarning = ({
  type = "motion",
}: {
  type?: "motion" | "responsive";
}) => {
  const [open, setOpen] = useState(false);
  const shouldUseMotion = useShouldUseMotion();
  const { isLaptop } = useResponsive();

  const title =
    type === "motion" ? "Motion Sensitivity Warning" : "Responsive Warning";

  useEffect(() => {
    if (shouldUseMotion) {
      setOpen(true);
    }
  }, [shouldUseMotion]);

  if (!open) return null;

  if (!isLaptop || type === "motion")
    return (
      <motion.section
        id="ProjectWarning"
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
            <h1>{title}</h1>
            <X size={24} onClick={() => setOpen(false)} />
          </div>
          {type === "motion" ? (
            <>
              <p>
                This page includes animations that could potentially cause
                discomfort for individuals with vestibular disorders, motion
                sensitivity, or migraines. Your well-being is important to us.
              </p>
              <p>
                If you experience motion sensitivity, you can turn off
                animations in your OS or browser settings under “Reduce Motion”.
              </p>
              <p>
                For more information visit:{" "}
                <TransitionLink href="/reduce-motion-info">
                  /reduce-motion-info
                </TransitionLink>
              </p>
            </>
          ) : (
            <>
              <p>
                This section is best experienced in desktop or larger devices
                with cursor.
              </p>
              <p>Tap on X or tap on blank area to continue.</p>
            </>
          )}
        </motion.div>
      </motion.section>
    );
};

export default ProjectWarning;
