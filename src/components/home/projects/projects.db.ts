import type { LinkProps } from "next/link";

type ProjectsDataType = {
  title: string;
  link: LinkProps<string>["href"] | "/";
  description: string;
}[];

export const projectsData: ProjectsDataType = [
  {
    title: "Components",
    link: "/projects/components",
    description: "DESIGN | ANIMATION | NEXT",
  },
  {
    title: "Websites",
    link: "/",
    description: "CODE | ANIMATION | NEXT",
  },
  {
    title: "Magazine",
    link: "/projects/magazine",
    description: "DESIGN | ABSTRACT | NEXT",
  },
  {
    title: "Design",
    link: "/projects/design",
    description: "DESIGN | BRANDING | LOGOS",
  },
  {
    title: "Api",
    link: "/",
    description: "CODE FUNCTIONALITY | NEXT",
  },
];
