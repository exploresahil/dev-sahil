import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import "./style.scss";

type Props = {
  title: string;
  subTitle: string;
  link: string;
};

const CommonHeader = ({ title, subTitle, link }: Props) => {
  return (
    <section id="DesignHeader">
      <div className="header-title">
        <Link href={link}>
          <ArrowLeft size={20} />
          {title}
        </Link>
        <h2>{subTitle}</h2>
      </div>
    </section>
  );
};

export default CommonHeader;
