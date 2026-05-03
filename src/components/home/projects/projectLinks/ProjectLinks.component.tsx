import { MoveRight } from "lucide-react";
import type { Route } from "next";
import "./style.scss";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";

interface ProjectLinksProps {
  href?: Route;
  title?: React.ReactNode;
  index?: number;
  subtitle?: React.ReactNode;
}

const ProjectLinks = ({
  href = "/",
  title = "Title",
  index = 1,
  subtitle = "Subtitle",
}: ProjectLinksProps) => {
  return (
    <TransitionLink href={href} id="ProjectLinks">
      <p className="project_links_index">{index}</p>
      <div className="project_links_title">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <MoveRight strokeWidth={1.5} className="move_right_icon" />
    </TransitionLink>
  );
};

export default ProjectLinks;
