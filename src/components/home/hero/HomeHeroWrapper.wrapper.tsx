"use client";

import { useState } from "react";
import HomeHero from "@/components/home/hero/HomeHero.section";
import HomeLoader from "@/components/home/loader/HomeLoader.component";

/**
 * Thin client shell that:
 *  1. Tracks when the hero image is done loading  (isReady)
 *  2. Tracks when the loader exit animation ends   (canAnimate)
 * Both signals are bridged into the child components.
 */
const HomeHeroWrapper = () => {
  const [isReady, setIsReady] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  return (
    <>
      <HomeLoader
        isReady={isReady}
        onStartExit={() => setCanAnimate(true)}
        onExited={() => {}}
      />
      <HomeHero onReady={() => setIsReady(true)} canAnimate={canAnimate} />
    </>
  );
};

export default HomeHeroWrapper;
