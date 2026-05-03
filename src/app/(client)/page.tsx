import HomeAbout from "@/components/home/about/HomeAbout.section";
import Ask from "@/components/home/ask/Ask.section";
import HomeHeroWrapper from "@/components/home/hero/HomeHeroWrapper.wrapper";
import HomeProjects from "@/components/home/projects/HomeProjects.section";
import HomeSkills from "@/components/home/skills/HomeSkills.section";
import Workflow from "@/components/home/workflow/Workflow.section";
import { MotionWarning } from "@/components/warnings/motion/MotionWarning.modal";

export default function Home() {
  return (
    <>
      <MotionWarning />
      <HomeHeroWrapper />
      <HomeAbout />
      <HomeSkills />
      <HomeProjects />
      <Workflow />
      <Ask />
    </>
  );
}
