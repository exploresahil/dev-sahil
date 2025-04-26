import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import "./style.scss";

const DesignHeader = () => {
  return (
    <section id="DesignHeader">
      <div className="header-title">
        <Link href="/projects">
          <ArrowLeft size={20} />
          Projects
        </Link>
        <h2>Design</h2>
      </div>
    </section>
  );
};

export default DesignHeader;
