"use client";

// /components/MotionWarning.tsx
import { useState } from "react";
import "./style.scss";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export function MotionWarning() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <section id="MotionWarning" onClick={() => setShow(false)}>
      <div className="warning_bg">
        <div className="warning_content" onClick={(e) => e.stopPropagation()}>
          <TriangleAlert size={30} />

          <p>
            This page includes animations that could potentially cause
            discomfort for individuals with vestibular disorders, motion
            sensitivity, or migraines. Your well-being is important to us.
          </p>
          <p>
            If you experience motion sensitivity, you can turn off animations in
            your OS or browser settings under “Reduce Motion.” For more
            information visit{" "}
            <Link href="/reduce-motion-info">/reduce-motion-info</Link>
          </p>

          <p>
            Note: Some micro animations might play even if you have turned off
            animations in your OS or browser settings.
          </p>
        </div>
        <button
          aria-label="Dismiss warning"
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </button>
      </div>
    </section>
  );
}
