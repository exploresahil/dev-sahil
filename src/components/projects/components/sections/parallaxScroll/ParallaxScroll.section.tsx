"use client";

import dynamic from "next/dynamic";
import ProjectWarning from "../../warning/ProjectWarning";
import "./style.scss";

// no GSAP or images here—just the warning + a placeholder
const ParallaxImages = dynamic(
  () => import("./ParallaxImages.component").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p className="dynamic__loading">Loading...</p>,
  },
);

export default function ParallaxScroll() {
  return (
    <section id="ParallaxScroll">
      <ProjectWarning />
      <ParallaxImages />
    </section>
  );
}
