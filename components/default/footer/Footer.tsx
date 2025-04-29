import Link from "next/link";
import "./style.scss";
import Socials from "./socials/Socials";
import AnimatedText from "@/components/animation/animated-text/AnimatedText";
import { navData } from "./navdata.db";

const Footer = () => {
  return (
    <footer id="Footer">
      <div className="footer_container">
        <nav>
          {navData.map((project, index) => (
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
