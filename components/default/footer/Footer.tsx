import Link from "next/link";
import "./style.scss";
import { projectsData } from "@/database/projects";
import Socials from "./socials/Socials";
import AnimatedText from "@/components/animation/animated-text/AnimatedText";

const Footer = () => {
  return (
    <footer id="Footer">
      <div className="footer_container">
        <nav>
          {projectsData.map((project, index) => (
            <Link href={project.link} key={index}>
              <AnimatedText text={project.title} />
            </Link>
          ))}
        </nav>
        <div className="bottom">
          <Link href="/" className="logo">
            Sahil Satpute
          </Link>
          <Socials />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
