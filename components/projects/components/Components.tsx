import Link from "next/link";
import "./style.scss";
import { componentsData } from "@/database/components";
import { MoveRight } from "lucide-react";
import ProjectsTitlecard from "../ProjectsTitlecard";

const Components = () => {
  return (
    <section id="Components">
      <ProjectsTitlecard
        img="https://images.unsplash.com/photo-1659469377768-4f42f2f091c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Components"
        desc=" Our components are brought to life with a blend of React, Next.js,
              CSS, SCSS, and cutting-edge animation techniques. We leverage the
              power of Framer Motion, GSAP, vanilla JS, keyframes, and other
              top-tier libraries to create seamless, interactive experiences.
              While we strive to keep our tech stack current, feel free to reach
              out if you encounter any issues."
      />
      <div className="components">
        {componentsData.map((component, i) => (
          <Link
            key={`${component.title}-${i}`}
            href={`/projects/components/${component.slug}`}
          >
            <div className="left">
              <h4>{component.title}</h4>
              <p>{component.description}</p>
            </div>
            <MoveRight />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Components;
