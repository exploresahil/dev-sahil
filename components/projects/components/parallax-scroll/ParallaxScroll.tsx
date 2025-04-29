"use client";

import dynamic from "next/dynamic";
import ProjectMotionWarning from "../motionWarning/ProjectMotionWarning";

// no GSAP or images here—just the warning + a placeholder
const ParallaxImages = dynamic(
  () =>
    import("./parallaxImages/ParallaxImages").then((mod) => mod.ParallaxImages),
  {
    ssr: false,
    loading: () => (
      <section id="ParallaxScroll">
        <p>Loading...</p>
      </section>
    ),
  }
);

export default function ParallaxScroll() {
  return (
    <section id="ParallaxScroll">
      <ProjectMotionWarning />
      <div className="title">
        <h1>Explore Wes Anderson Inspired Gallery</h1>
      </div>
      <ParallaxImages />
    </section>
  );
}
