import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import "./style.scss";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import AnimatedText from "@/components/animations/animated-text/AnimatedText";
import Star from "@/components/icon/star/Star";
import TransitionLink from "@/context/transitionLink/TransitionLink.component";
import type { ComponentsType } from "../../components.db";
import { opacity, slideLeft } from "./menu.anim";

type Props = {
  setSelectedData: Dispatch<SetStateAction<string>>;
  data: ComponentsType[];
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Menu = ({ setSelectedData, data, isOpen, setOpen }: Props) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );

  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  useEffect(() => {
    const matchingNavItem = data.findIndex((item) => item.slug === currentSlug);
    if (matchingNavItem === -1) {
      setSelectedItemIndex(null);
    } else {
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
    <div id="Menu">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="removeCursor"
      >
        <AnimatedText text="menu" />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={opacity}
            initial="initial"
            animate="enter"
            exit="exit"
            className="menu_cont"
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
                <button type="button" onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>
              <div className="links">
                {data.map((item, i) => {
                  return (
                    <TransitionLink
                      key={item.title}
                      onClick={() => handleItemClick(i, item.title)}
                      href={`/projects/components/${item.slug}` as Route}
                    >
                      {item.title}{" "}
                      {selectedItemIndex === i ? (
                        <Star fill="#f5f5f7" position="relative" />
                      ) : null}
                    </TransitionLink>
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

export default Menu;
