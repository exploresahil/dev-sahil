import Link from "next/link";
import socialData from "./db";
import GsapMagnetic from "@/components/animation/magnetic-gsap/GsapMagnetic";

const Socials = () => {
  return (
    <div className="socials">
      {socialData.map((link, index) => (
        <Link
          key={`${link}-${index}`}
          href={link.href}
          target="_blank"
          className="removeCursor"
          title={link.title}
        >
          <link.icon />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
