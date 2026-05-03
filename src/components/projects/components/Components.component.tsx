import { MoveRight } from "lucide-react";
import ProjectsTitlecard from "../projectsTitleCard/ProjectsTitlecard.component";
import { componentsData } from "./components.db";
import "./style.scss";
import type { Route } from "next";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";

const projectData = {
  image:
    "https://images.unsplash.com/photo-1659469377768-4f42f2f091c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Components",
  description:
    "Our components are brought to life with a blend of React, Next.js, CSS, SCSS, and cutting-edge animation techniques. We leverage the power of Framer Motion, GSAP, vanilla JS, keyframes, and other top-tier libraries to create seamless, interactive experiences. While we strive to keep our tech stack current, feel free to reach out if you encounter any issues.",
};

const Components = () => {
  return (
    <section id="Components">
      <ProjectsTitlecard
        img={projectData.image}
        title={projectData.title}
        desc={projectData.description}
      />
      <div className="components">
        {componentsData.map((component, i) => (
          <TransitionLink
            key={`${component.title}-${i}`}
            href={`/projects/components/${component.slug}` as Route}
          >
            <div className="left">
              <h4>{component.title}</h4>
              <p>{component.description}</p>
            </div>
            <MoveRight />
          </TransitionLink>
        ))}
      </div>
    </section>
  );
};

export default Components;
