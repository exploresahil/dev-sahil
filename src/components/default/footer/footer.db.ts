import { projectsData } from "@/components/home/projects/projects.db";

export const navData = [
  ...projectsData,
  {
    title: "404",
    link: "/404",
    description: "404 NOT FOUND",
  },
];
