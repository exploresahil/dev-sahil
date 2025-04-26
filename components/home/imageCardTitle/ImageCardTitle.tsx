import Noise from "@/components/animation/noise/Noise";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion";
import { motion, MotionValue } from "motion/react";
import { Ref, useEffect, useRef, useState, CSSProperties } from "react";
import "./style.scss";

const ImageCardTitle = ({
  image,
  scale,
  ref,
  style,
}: {
  image: string;
  scale: MotionValue<number>;
  ref: Ref<HTMLDivElement> | undefined;
  style?: CSSProperties;
}) => {
  const [mounted, setMounted] = useState(false);

  const shouldUseMotion = useShouldUseMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="img_container" ref={ref}>
      <motion.img
        src={image}
        alt="Projects cover"
        style={{
          scale: mounted && shouldUseMotion ? scale : 1,
          ...style,
        }}
      />
      <Noise />
    </div>
  );
};

export default ImageCardTitle;
