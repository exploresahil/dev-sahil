import Noise from "@/components/animation/noise/Noise";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion";
import { motion, MotionValue } from "motion/react";
import { Ref, CSSProperties } from "react";
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
  const shouldUseMotion = useShouldUseMotion();

  return (
    <div className="img_card_title_container" ref={ref}>
      <motion.img
        src={image}
        alt="Projects cover"
        style={{
          scale: shouldUseMotion ? scale : 1,
          ...style,
        }}
      />
      <Noise />
    </div>
  );
};

export default ImageCardTitle;
