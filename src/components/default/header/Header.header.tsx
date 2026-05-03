import Link from "next/link";
import AnimatedText from "@/components/animations/animated-text/AnimatedText";
import "./style.scss";
import Logo from "@/components/icon/logo/Logo.icon";

const Header = () => {
  return (
    <header id="Header">
      <Link href="/">
        <Logo />
      </Link>
      <Link className="contact" href="/">
        <AnimatedText text="Say Hello" />
      </Link>
      <div className="gradient-blur">
        {["b1", "b2", "b3", "b4", "b5", "b6"].map((id) => (
          <div key={id} />
        ))}
      </div>
    </header>
  );
};

export default Header;
