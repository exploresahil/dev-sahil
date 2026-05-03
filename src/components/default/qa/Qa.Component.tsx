"use client";

import { Plus } from "lucide-react";
import "./style.scss";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  data: {
    title: string;
    desc: string;
  }[];
}

export const accordianDescVarients = {
  initial: {
    height: 0,
    opacity: 0,
  },
  enter: {
    height: "auto",
    opacity: 1,
  },
  exit: {
    height: 0,
    opacity: 0,
  },
};

const Qa = ({ data }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="Qa">
      {data.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="qa_item">
            <button type="button" onClick={() => handleToggle(i)}>
              <h4>{item.title}</h4>
              <motion.span
                className="icon"
                animate={{ rotate: isOpen ? -45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus strokeWidth={1.5} />
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  className="qa_content"
                  variants={accordianDescVarients}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                >
                  <p>{item.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Qa;
