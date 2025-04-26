import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import "./style.scss";
import useResponsive from "@/hooks/useResponsive";

const CardTilt = ({
  children,
  className,
  springValues = {
    damping: 15,
    stiffness: 100,
    mass: 1,
  },
}: {
  children: React.ReactNode;
  className?: string;
  springValues?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}) => {
  const { isDesktop } = useResponsive();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -14;
    const rotationY = (offsetX / (rect.width / 2)) * 14;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      scale.set(1.1);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      scale.set(1);
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  return (
    <motion.div
      id="CardTilt"
      className={className}
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
      }}
      onMouseMove={isDesktop ? handleMouse : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default CardTilt;
