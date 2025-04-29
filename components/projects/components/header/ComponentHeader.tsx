"use client";

import { componentsData } from "@/database/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from "./dropdown/Dropdown";
import "./style.scss";
import { ArrowBack } from "@/components/icon/ui/Arrows";

const ComponentHeader = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>("Website Sections");
  const [link, setLink] = useState<{ title: string; href: string }>({
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
        (item) => item.slug === currentSlug
      );
      if (matchingNavItem) {
        setSelectedData(matchingNavItem.title);
      }
    }
  }, [pathname, currentSlug, componentsData]);

  useEffect(() => {
    if (pathname === "/projects/components") {
      setLink({ title: "Projects", href: "/projects" });
    } else if (componentsData.some((item) => item.slug === currentSlug)) {
      setLink({ title: "Components", href: "/projects/components" });
    } else {
      setLink({ title: "Projects", href: "/projects" });
    }
  }, [pathname, currentSlug]);

  // console.log("pathname->", pathname);
  // console.log("link->", link);

  return (
    <section id="ComponentHeader">
      <div className="header-title">
        <Link href={link.href}>
          <ArrowBack />
          {link.title}
        </Link>
        <h2>Components</h2>
        <h3>{selectedData}</h3>
      </div>
      <Dropdown
        setSelectedData={setSelectedData}
        data={componentsData}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </section>
  );
};

export default ComponentHeader;
