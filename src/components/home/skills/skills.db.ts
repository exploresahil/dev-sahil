import AdobeAe from "@/components/icon/creative/AdobeAe.icon";
import AdobeAi from "@/components/icon/creative/AdobeAi.icon";
import AdobeDn from "@/components/icon/creative/AdobeDn.icon";
import AdobeLrc from "@/components/icon/creative/AdobeLrc.icon";
import AdobePr from "@/components/icon/creative/AdobePr.icon";
import AdobePs from "@/components/icon/creative/AdobePs.icon";
import AdobeXd from "@/components/icon/creative/AdobeXd.icon";
import Blender from "@/components/icon/creative/Blender.icon";
import Figma from "@/components/icon/creative/Figma.icon";
import ApolloGraphQlLogo from "@/components/icon/development/ApolloGraphQl.icon";
import CSS from "@/components/icon/development/CSS.icon";
import FramerMotionLogo from "@/components/icon/development/FramerMotion.icon";
import GSAP from "@/components/icon/development/GSAP.icon";
import HTML from "@/components/icon/development/HTML.icon";
import Javascript from "@/components/icon/development/Javascript.icon";
import NextJsLogo from "@/components/icon/development/NextJs.icon";
import NodeLogo from "@/components/icon/development/Node.icon";
import React from "@/components/icon/development/React.icon";
import SCSS from "@/components/icon/development/SCSS.icon";
import ThreeLogo from "@/components/icon/development/Three.icon";
import Typescript from "@/components/icon/development/Typescript.icon";

export type SkillItem = {
  name: string;
  component: React.FC;
};

export type SkillCategory = {
  title: string;
  items: SkillItem[];
};

export type SkillsData = {
  title: string;
  items: SkillCategory[];
};

export const skillsData: SkillsData = {
  title: "Skills",
  items: [
    {
      title: "Development",
      items: [
        {
          name: "HTML",
          component: HTML,
        },
        {
          name: "CSS",
          component: CSS,
        },
        {
          name: "SASS",
          component: SCSS,
        },
        {
          name: "JavaScript",
          component: Javascript,
        },
        {
          name: "TypeScript",
          component: Typescript,
        },
        {
          name: "React",
          component: React,
        },
        {
          name: "Next.js",
          component: NextJsLogo,
        },
        /*  {
          name: "Angular",
          component: AngularLogo,
        }, */
        {
          name: "Three.js",
          component: ThreeLogo,
        },
        {
          name: "Node.js",
          component: NodeLogo,
        },
        {
          name: "Apollo GraphQL",
          component: ApolloGraphQlLogo,
        },
        {
          name: "Framer Motion",
          component: FramerMotionLogo,
        },
        {
          name: "GSAP",
          component: GSAP,
        },
      ],
    },
    {
      title: "Creative",
      items: [
        {
          name: "Adobe XD",
          component: AdobeXd,
        },
        {
          name: "Adobe Illustrator",
          component: AdobeAi,
        },
        {
          name: "Adobe Lightroom",
          component: AdobeLrc,
        },
        {
          name: "Adobe Photoshop",
          component: AdobePs,
        },
        {
          name: "Adobe Primere Pro",
          component: AdobePr,
        },
        {
          name: "Adobe After Effects",
          component: AdobeAe,
        },
        {
          name: "Adobe Dimension",
          component: AdobeDn,
        },
        {
          name: "Blender",
          component: Blender,
        },
        {
          name: "Figma",
          component: Figma,
        },
      ],
    },
  ],
};
