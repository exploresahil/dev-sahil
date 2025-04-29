"use client";

import dynamic from "next/dynamic";
import ProjectMotionWarning from "../motionWarning/ProjectMotionWarning";

// no GSAP or images here—just the warning + a placeholder
const ParallaxImages = dynamic(
  () =>
    import("./parallaxImages/ParallaxImages").then((mod) => mod.ParallaxImages),
  {
    ssr: false,
    loading: () => <p className="dynamic__loading">Loading...</p>,
  }
);

export default function ParallaxScroll() {
  return (
    <section id="ParallaxScroll">
      <ProjectMotionWarning />

      <ParallaxImages />
    </section>
  );
}
