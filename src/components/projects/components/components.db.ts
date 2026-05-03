import AudioVisualizer from "./sections/audioVisualizer/AudioVisualizer.section";
import HoverImageSlideMenu from "./sections/hoverImageSlideMenu/HoverImageSlideMenu.section";
import MaskCursorEffect from "./sections/maskCursorEffect/MaskCursorEffect.section";
import Menus from "./sections/menus/Menus.section";
import ParallaxScroll from "./sections/parallaxScroll/ParallaxScroll.section";
import PixelCursorMove from "./sections/pixelCursorMove/PixelCursorMove.section";
import ScrollTextReveal from "./sections/scrollTextReveal/ScrollTextReveal.section";

export interface ComponentsType {
  title: string;
  slug: string;
  component: React.FC | null;
  description: string;
}

export const componentsData: ComponentsType[] = [
  {
    title: "Parallax Scroll",
    slug: "parallax-scroll",
    component: ParallaxScroll,
    description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION",
  },
  {
    title: "Menus",
    slug: "menus",
    component: Menus,
    description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION",
  },
  {
    title: "Audio Visualizer",
    slug: "audio-visualizer",
    component: AudioVisualizer || null,
    description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION",
  },
  {
    title: "Hover Image Slide Menu",
    slug: "hover-image-slide-menu",
    component: HoverImageSlideMenu,
    description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION",
  },
  {
    title: "Pixel Cursor Move",
    slug: "pixel-cursor-move",
    component: PixelCursorMove,
    description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION",
  },
  {
    title: "Mask Cursor Effect",
    slug: "mask-cursor-effect",
    component: MaskCursorEffect,
    description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION",
  },
  {
    title: "Scroll Text Reveal",
    slug: "scroll-text-reveal",
    component: ScrollTextReveal,
    description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION",
  },
];
