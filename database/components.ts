import AudioVisualizer from "@/components/projects/components/audio-visualizer/AudioVisualizer";
import HoverImageSlideMenu from "@/components/projects/components/hover-image-slide-menu/HoverImageSlideMenu";
import MaskCursorEffect from "@/components/projects/components/mask-cursor-effect/MaskCursorEffect";
import Menus from "@/components/projects/components/menus/Menus";
import ParallaxScroll from "@/components/projects/components/parallax-scroll/ParallaxScroll";
import PixelCursorMove from "@/components/projects/components/pixel-cursor-move/PixelCursorMove";
import ScrollTextReveal from "@/components/projects/components/scroll-text-reveal/ScrollTextReveal";

export interface componentsType {
    title: string;
    slug: string;
    component: React.FC;
    description: string;
}

export const componentsData: componentsType[] = [
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
        description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION"
    },
    {
        title: "Audio Visualizer",
        slug: "audio-visualizer",
        component: AudioVisualizer,
        description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION"
    },
    {
        title: "Hover Image Slide Menu",
        slug: "hover-image-slide-menu",
        component: HoverImageSlideMenu,
        description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION"
    },
    {
        title: "Pixel Cursor Move",
        slug: "pixel-cursor-move",
        component: PixelCursorMove,
        description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION"
    },
    {
        title: "Mask Cursor Effect",
        slug: "mask-cursor-effect",
        component: MaskCursorEffect,
        description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION"
    },
    {
        title: "Scroll Text Reveal",
        slug: "scroll-text-reveal",
        component: ScrollTextReveal,
        description: "NEXT JS | FRAMER MOTION | CSS | SCSS | GSAP | ANIMATION"
    }
];
