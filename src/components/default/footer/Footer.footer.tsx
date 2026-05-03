"use client";

import Link from "next/link";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/animations/animated-text/AnimatedText";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";
import Socials from "../socials/Socials.component";
import { navData } from "./footer.db";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Footer = () => {
  return (
    <footer id="Footer">
      <div className="footer_container">
        <nav>
          {navData.map((project) => (
            <TransitionLink href={project.link as "/"} key={project.title}>
              <AnimatedText text={project.title} />
            </TransitionLink>
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
