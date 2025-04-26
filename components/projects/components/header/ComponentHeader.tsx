"use client";

import { componentsData } from "@/database/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from "./dropdown/Dropdown";
import "./style.scss";
import { ArrowLeft } from "lucide-react";

const ComponentHeader = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>("Parallax Scroll");

  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  useEffect(() => {
    const matchingNavItem = componentsData.find(
      (item) => item.slug === currentSlug
    );
    if (matchingNavItem) {
      setSelectedData(matchingNavItem.title);
    }
  }, [currentSlug, componentsData]);

  return (
    <section id="ComponentHeader">
      <div className="header-title">
        <Link href="/projects">
          <ArrowLeft size={20} />
          Projects
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
