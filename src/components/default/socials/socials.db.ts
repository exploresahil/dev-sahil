import type { LinkProps } from "next/link";
import Behance from "@/components/icon/social/Behance.icon";
import FrontendMentor from "@/components/icon/social/FrontendMentor.icon";
import Github from "@/components/icon/social/Github.icon";
import LinkedIn from "@/components/icon/social/LinkedIn.icon";

interface SocialDataItem {
  title: string;
  href: LinkProps<string>["href"];
  icon: React.FC;
}

const socialData: SocialDataItem[] = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/exploresahil/",
    icon: LinkedIn,
  },
  {
    title: "Github",
    href: "https://github.com/exploresahil",
    icon: Github,
  },
  {
    title: "Behance",
    href: "https://www.behance.net/exploresahil",
    icon: Behance,
  },
  {
    title: "Frontend Mentor",
    href: "https://www.frontendmentor.io/profile/exploresahil",
    icon: FrontendMentor,
  },
];

export default socialData;
