import ImageSection from "@/components/default/imageSection/ImageSection.component";
import "./style.scss";
import type { Route } from "next";
import ProjectLinks from "./projectLinks/ProjectLinks.component";
import { projectsData } from "./projects.db";

const HomeProjects = () => {
  return (
    <section id="HomeProjects">
      <ImageSection title="Projects" animationType="projects">
        {projectsData.map((project, index) => (
          <ProjectLinks
            key={project.title}
            title={project.title}
            index={index + 1}
            subtitle={project.description}
            href={project.link as Route}
          />
        ))}
      </ImageSection>
    </section>
  );
};

export default HomeProjects;
