"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.scss";
import { motion, AnimatePresence } from "motion/react";
import { opacity, slideLeft } from "@/utils/anim";
import { usePathname } from "next/navigation";
import AnimatedText from "@/components/animation/animated-text/AnimatedText";
import { X } from "lucide-react";
import Star from "@/components/icon/star/Star";
import { componentsType } from "@/database/components";

type Props = {
  setSelectedData: Dispatch<SetStateAction<string>>;
  data: componentsType[];
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Dropdown = ({ setSelectedData, data, isOpen, setOpen }: Props) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(0);

  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  useEffect(() => {
    const matchingNavItem = data.findIndex((item) => item.slug === currentSlug);
    if (matchingNavItem !== -1) {
      setSelectedItemIndex(matchingNavItem);
      setSelectedData(data[matchingNavItem].title);
    }
  }, [currentSlug, data, setSelectedData]);

  const handleItemClick = (index: number, title: string) => {
    setSelectedItemIndex(index);
    setSelectedData(title);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div id="projectsDropdown">
      <button onClick={() => setOpen(true)} className="removeCursor">
        <AnimatedText text="menu" />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={opacity}
            initial="initial"
            animate="enter"
            exit="exit"
            className="menu-cont"
            onClick={handleClose}
          >
            <motion.nav
              variants={slideLeft}
              initial="initial"
              animate="enter"
              exit="exit"
              id="productsNav"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="title">
                <h2>Website Components</h2>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>
              <div className="links">
                {data.map((item, i) => {
                  return (
                    <Link
                      key={i}
                      onClick={() => handleItemClick(i, item.title)}
                      href={`/projects/components/${item.slug}`}
                    >
                      {item.title}{" "}
                      {selectedItemIndex === i ? (
                        <Star fill="#f5f5f7" position="relative" />
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
