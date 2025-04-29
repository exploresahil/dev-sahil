import AdobeAe from "@/components/icon/creative/AdobeAe";
import AdobeAi from "@/components/icon/creative/AdobeAi";
import AdobeDn from "@/components/icon/creative/AdobeDn";
import AdobeLrc from "@/components/icon/creative/AdobeLrc";
import AdobePr from "@/components/icon/creative/AdobePr";
import AdobePs from "@/components/icon/creative/AdobePs";
import AdobeXd from "@/components/icon/creative/AdobeXd";
import Blender from "@/components/icon/creative/Blender";
import Figma from "@/components/icon/creative/Figma";
import ApolloGraphQlLogo from "@/components/icon/development/ApolloGraphQlLogo";
import CSS from "@/components/icon/development/CSS";
import FramerMotionLogo from "@/components/icon/development/FramerMotionLogo";
import GSAP from "@/components/icon/development/GSAP";
import HTML from "@/components/icon/development/HTML";
import Javascript from "@/components/icon/development/Javascript";
import NextJsLogo from "@/components/icon/development/NextJsLogo";
import React from "@/components/icon/development/React";
import SCSS from "@/components/icon/development/SCSS";
import Typescript from "@/components/icon/development/Typescript";

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