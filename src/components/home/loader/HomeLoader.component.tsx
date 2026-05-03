"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import "./style.scss";

interface HomeLoaderProps {
  isReady: boolean;
  onStartExit?: () => void;
  onExited?: () => void;
}

const EXIT_DURATION = 900; // ms — matches CSS transition
const BOX_IDS = Array.from({ length: 16 }, (_, i) => `grid-box-${i}`);

const HomeLoader = ({ isReady, onStartExit, onExited }: HomeLoaderProps) => {
  const [phase, setPhase] = useState<"visible" | "exiting" | "hidden">(
    "visible",
  );
  const [activeBox, setActiveBox] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lenis = useLenis();

  // ── Grid Animation ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === "hidden") return;
    const interval = setInterval(() => {
      setActiveBox(Math.floor(Math.random() * 16));
    }, 150);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Scroll lock ────────────────────────────────────────────────────────────
  // Stop Lenis + block native overflow while the loader is active.
  // Snap to top so the hero entrance always starts at position 0.
  useEffect(() => {
    if (globalThis.window !== undefined && "history" in globalThis) {
      globalThis.history.scrollRestoration = "manual";
    }

    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });
    lenis.stop();
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Safety: restore scroll if the component unmounts unexpectedly
      lenis.start();
      document.documentElement.style.overflow = "";
    };
  }, [lenis]);

  // ── Exit sequence ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    const MIN_MS = 1400;
    const elapsed = performance.now();
    const remaining = Math.max(0, MIN_MS - elapsed);

    timerRef.current = setTimeout(() => {
      setPhase("exiting");
      onStartExit?.();

      timerRef.current = setTimeout(() => {
        setPhase("hidden");
        onExited?.();
      }, EXIT_DURATION);
    }, remaining);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isReady, onExited, onStartExit]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`home_loader${phase === "exiting" ? " exiting" : ""}`}
      aria-hidden="true"
    >
      <div className="grid_loader">
        {BOX_IDS.map((boxId, i) => (
          <div
            key={boxId}
            className={`grid_box ${i === activeBox ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="loader_text">
        <span className="loader_label">initializing</span>
        <div className="loader_dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;
