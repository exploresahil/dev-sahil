import { BookOpen, Component, DraftingCompass, Globe, Link, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";


type ProjectsDataType =
    {
        title: string;
        link: string;
        description: string;
        conponent: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[];

export const projectsData: ProjectsDataType = [
    {
        title: "Components",
        link: "/projects/components/",
        description: "DESIGN | ANIMATION | NEXT | 2024",
        conponent: Component
    },
    {
        title: "Websites",
        link: "/projects/websites/",
        description: "CODE | ANIMATION | NEXT | 2024",
        conponent: Globe
    },
    {
        title: "Magazine",
        link: "/projects/magazine/",
        description: "DESIGN | ABSTRACT | NEXT | 2024",
        conponent: BookOpen
    },
    {
        title: "Design",
        link: "/projects/design/",
        description: "DESIGN | BRANDING | LOGOS | 2024",
        conponent: DraftingCompass
    },
    {
        title: "Api",
        link: "/projects/api/",
        description: "CODE FUNCTIONALITY | NEXT | 2024",
        conponent: Link
    },
];