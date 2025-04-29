"use client";

// /components/MotionWarning.tsx
import { useWarningStore } from "@/hooks/useWarningStore";
import "./style.scss";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion";

export function MotionWarning() {
  const warningDismissed = useWarningStore((state) => state.warningDismissed);
  const dismissWarning = useWarningStore((state) => state.dismissWarning);
  const shouldUseMotion = useShouldUseMotion();

  if (!shouldUseMotion || warningDismissed) return null;

  return (
    <motion.section
      id="MotionWarning"
      onClick={dismissWarning}
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
      >
        <div className="warning_content" onClick={(e) => e.stopPropagation()}>
          <TriangleAlert size={30} />
          <h1>Motion Sensitivity Warning</h1>
          <p>
            This website includes animations that could potentially cause
            discomfort for individuals with vestibular disorders, motion
            sensitivity, or migraines. Your well-being is important to us.
          </p>
          <p>
            If you experience motion sensitivity, you can turn off animations in
            your OS or browser settings under “Reduce Motion”. For more
            information visit{" "}
            <Link href="/reduce-motion-info">/reduce-motion-info</Link>
          </p>

          <p>
            Note: Some micro animations might play even if you have turned off
            animations in your OS or browser settings.
          </p>
        </div>
        <button aria-label="Dismiss warning" onClick={dismissWarning}>
          Close
        </button>
      </motion.div>
    </motion.section>
  );
}
