import Link from "next/link";
import socialData from "./socials.db";
import "./style.scss";

const Socials = () => {
  return (
    <div id="Socials">
      {socialData.map((link) => (
        <Link
          key={link.title}
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
