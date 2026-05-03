"use client";

import { useEffect } from "react";
import { useWarningStore } from "@/hooks/useWarningStore.hook";
import "./style.scss";
import { X } from "lucide-react";
import { motion } from "motion/react";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";

export function MotionWarning() {
  const warningDismissed = useWarningStore((state) => state.warningDismissed);
  const dismissWarning = useWarningStore((state) => state.dismissWarning);
  const shouldUseMotion = useShouldUseMotion();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dismissWarning();
    }
  };

  useEffect(() => {
    if (warningDismissed || !shouldUseMotion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissWarning();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [warningDismissed, shouldUseMotion, dismissWarning]);

  if (!shouldUseMotion || warningDismissed) return null;

  return (
    <motion.section
      id="MotionWarning"
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
    >
      <motion.div
        className="warning_bg"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        role="dialog"
        aria-labelledby="motion-warning-title"
        aria-modal="true"
      >
        <div className="warning_content">
          <div className="title">
            <h1>Motion Sensitivity Warning</h1>
            <X size={24} onClick={dismissWarning} />
          </div>
          <p>
            This website includes animations that could potentially cause
            discomfort for individuals with vestibular disorders, motion
            sensitivity, or migraines. Your well-being is important to us.
          </p>
          <p>
            If you experience motion sensitivity, you can turn off animations in
            your OS or browser settings under “Reduce Motion”. For more
            information visit{" "}
            <TransitionLink href="/reduce-motion-info">
              /reduce-motion-info
            </TransitionLink>
          </p>

          <p>
            Note: Some micro animations might play even if you have turned off
            animations in your OS or browser settings.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
