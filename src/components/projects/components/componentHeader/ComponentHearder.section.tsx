"use client";

import type { LinkProps } from "next/link";
import "./style.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowBack } from "@/components/icon/ui/Arrows.icons";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";
import { componentsData } from "../components.db";
import Menu from "./menu/Menu.component";

const ComponentHearder = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>("Website Sections");
  const [link, setLink] = useState<{
    title: string;
    href: LinkProps<string>["href"];
  }>({
    title: "Projects",
    href: "/projects",
  });

  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  useEffect(() => {
    if (pathname === "/projects/components") {
      setSelectedData("Website Sections");
    } else {
      const matchingNavItem = componentsData.find(
        (item) => item.slug === currentSlug,
      );
      if (matchingNavItem) {
        setSelectedData(matchingNavItem.title);
      }
    }
  }, [pathname, currentSlug]);

  useEffect(() => {
    if (pathname === "/projects/components") {
      setLink({ title: "Projects", href: "/projects" });
    } else if (componentsData.some((item) => item.slug === currentSlug)) {
      setLink({ title: "Components", href: "/projects/components" });
    } else {
      setLink({ title: "Projects", href: "/projects" });
    }
  }, [pathname, currentSlug]);

  return (
    <section id="ComponentHearder">
      <div className="header_title">
        <TransitionLink href={link.href}>
          <ArrowBack size={12} />
          {link.title}
        </TransitionLink>
        <h2>Components</h2>
        <h3>{selectedData}</h3>
      </div>
      <Menu
        setSelectedData={setSelectedData}
        data={componentsData}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </section>
  );
};

export default ComponentHearder;
