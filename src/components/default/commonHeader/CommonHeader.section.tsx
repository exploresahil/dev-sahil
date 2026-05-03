import "./style.scss";
import type { LinkProps } from "next/link";
import { ArrowBack } from "@/components/icon/ui/Arrows.icons";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";

type Props = {
  title: string;
  subTitle: string;
  href: LinkProps<string>["href"];
  selectedData: string;
};

const CommonHeader = ({ title, subTitle, href, selectedData }: Props) => {
  return (
    <section id="DesignHeader">
      <div className="header_title">
        <TransitionLink href={href}>
          <ArrowBack size={12} />
          {title}
        </TransitionLink>
        <h2>{subTitle}</h2>
        <h3>{selectedData}</h3>
      </div>
    </section>
  );
};

export default CommonHeader;
