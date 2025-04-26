"use client";

import "./style.scss";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { accordianDescVarients } from "@/utils/anim";
import { Plus } from "lucide-react";

interface Props {
  data: {
    title: string;
    desc: string;
  }[];
}

const Accordian = ({ data }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="Accordian">
      {data.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="accordian">
            <button onClick={() => handleToggle(i)}>
              <span>{item.title}</span>{" "}
              <motion.span
                className="icon"
                animate={{ rotate: isOpen ? -45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus />
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={accordianDescVarients}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="desc">
                    <p dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
