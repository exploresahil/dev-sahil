"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { type ComponentProps, useRef } from "react";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import GeometricAnimation from "@/components/animations/geometric/GeometricAnimation.component";
import { useShouldUseMotion } from "@/hooks/usePrefersReducedMotion.hook";
import { ImageSize } from "@/utils/image.util";

type AnimationType = "projects" | "ask" | "workflow";

const imageSectionVariants = cva("image_section", {
  variants: {
    variant: {
      default: "default",
      right: "right",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const ImageSection = ({
  className,
  variant,
  children,
  src,
  alt,
  title,
  objectPosition,
  animationType,
  ...props
}: ComponentProps<"div"> &
  VariantProps<typeof imageSectionVariants> & {
    src?: string;
    alt?: string;
    title: string;
    objectPosition?: string;
    animationType?: AnimationType;
  }) => {
  const imageSectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const shouldUseMotion = useShouldUseMotion();

  let imageContent: React.ReactNode = null;
  if (animationType) {
    imageContent = <GeometricAnimation animationType={animationType} />;
  } else if (src) {
    imageContent = (
      <Image
        src={src}
        alt={alt || ""}
        fill
        sizes={ImageSize.card}
        ref={imageRef}
        style={{ objectPosition: objectPosition || "center center" }}
      />
    );
  }

  useGSAP(
    () => {
      if (!shouldUseMotion || !imageRef.current || animationType) return;

      gsap.fromTo(
        imageRef.current,
        {
          scale: 4,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );
    },
    { scope: imageSectionRef, dependencies: [shouldUseMotion, animationType] },
  );

  return (
    <div
      data-slot="imageSection"
      id="ImageSection"
      className={clsx(imageSectionVariants({ variant, className }))}
      ref={imageSectionRef}
      {...props}
    >
      <div className="image_section_image" ref={imageContainerRef}>
        {imageContent}
      </div>
      <div className="image_section_content">
        <h2 className="section_title image_section_title">{title}</h2>
        <div className="image_section_children">{children}</div>
      </div>
    </div>
  );
};

export default ImageSection;
