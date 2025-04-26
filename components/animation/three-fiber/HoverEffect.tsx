import * as THREE from "three";
import { useRef, useState } from "react";
import { useTexture, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { CustomShaderMaterial } from "@/drei";

// Create the custom shader material
export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 0.5,
    dispFactor: 0,
    tex: null,
    tex2: null,
    disp: null,
  },
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  /*glsl*/ `
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float dispFactor;
    uniform float effectFactor;
    
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r * effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r * effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      
      // Mix the textures based on dispFactor
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      
      // Set the final fragment color with alpha blending
      gl_FragColor = vec4(finalTexture.rgb, finalTexture.a);

    }`
);

// Register the shader material
extend({ ImageFadeMaterial });

const HoverEffect = ({
  image1,
  image2,
  displacementImage,
}: {
  image1: string;
  image2: string;
  displacementImage: string;
}) => {
  const ref = useRef<CustomShaderMaterial>(null);
  const [texture1, texture2, dispTexture] = useTexture([
    image1,
    image2,
    displacementImage,
  ]);

  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (ref.current) {
      ref.current.dispFactor = THREE.MathUtils.lerp(
        ref.current.dispFactor,
        hovered ? 1 : 0,
        0.075
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[4, 5]} />
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
};

export default HoverEffect;
