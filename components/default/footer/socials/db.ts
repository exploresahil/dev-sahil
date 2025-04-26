import Behance from "@/components/icon/social/Behance";
import FrontendMentor from "@/components/icon/social/FrontendMentor";
import Github from "@/components/icon/social/Github";
import LinkedIn from "@/components/icon/social/LinkedIn";

interface SocialDataItem {
  title: string;
  href: string;
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
