import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
const HoverEffect = dynamic(
  () => import("@/components/animation/three-fiber/HoverEffect"),
  { ssr: false }
);

const CanvasContainerHoverEffect = () => {
  return (
    <div className="canvas_container">
      <Canvas
        style={{ background: "transparent" }}
        linear
        shadows
        camera={{ position: [0, 0, 8], fov: 34 }}
      >
        <HoverEffect
          image1="https://ik.imagekit.io/exploresahil/image-sahil-anime.png"
          image2="https://ik.imagekit.io/exploresahil/image-sahil.png"
          displacementImage="/displacement/14.jpg"
        />
      </Canvas>
    </div>
  );
};

export default CanvasContainerHoverEffect;
