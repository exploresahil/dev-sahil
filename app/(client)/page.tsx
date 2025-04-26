"use client";

import Hero from "@/components/home/hero/Hero";
import About from "@/components/home/about/About";
import Skills from "@/components/home/skills/Skills";
import Projects from "@/components/home/projects/Projects";
import Workflow from "@/components/home/workflow/Workflow";
import Ask from "@/components/home/ask/Ask";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Workflow />
      <Ask />
    </>
  );
}
