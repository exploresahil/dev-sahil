import Link from "next/link";
import { Code } from "lucide-react";
import "./style.scss";
import AnimatedText from "@/components/animation/animated-text/AnimatedText";

const Header = () => {
  return (
    <header id="Header">
      <Link href="/">
        <Code size={30} />
      </Link>
      <Link className="contact" href="/">
        <AnimatedText text="Say Hello" />
      </Link>
      <div className="gradient-blur">
        {Array(6)
          .fill(0)
          .map((_, value) => (
            <div key={value} />
          ))}
      </div>
    </header>
  );
};

export default Header;
