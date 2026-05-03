"use client";

import Link from "next/link";
import AnimatedText from "@/components/animations/animated-text/AnimatedText";
import DotsGrid from "@/components/animations/dots-grid/DotsGrid.component";
import "./style.scss";
import useResponsive from "@/hooks/useResponsive.hook";

const PageNotFound = () => {
  const { isMobile, isTablet } = useResponsive();

  // Use desktop default until the hook resolves on the client so the page
  // always renders and is never blank on back-navigation or bfcache restore.
  let charScale = 5;

  if (isMobile) charScale = 2;
  else if (isTablet) charScale = 3;

  return (
    <section id="notFound">
      <DotsGrid
        text="404"
        dotSize={4}
        dotSpacing={13}
        charScale={charScale}
        dotColor="#1d1d1f"
        trailGap={4}
        roverDensity={0.002}
        textDotColor="#ffffff"
        textDotOpacity={0.5}
        roverColor="#a81f18"
      />
      <div className="text_container">
        <Link href="/">
          <AnimatedText text="Return Home" />
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
