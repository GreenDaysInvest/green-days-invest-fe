"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import FaqCard from "../FaqCard/FaqCard";
import faqData from "../../[locale]/faq/faqData.json";
import { motion, useInView } from "framer-motion";

const Faq: React.FC = () => {
  const t = useTranslations("HomePage");

  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  useEffect(() => {
    const cardHeights = Array.from(document.querySelectorAll(".faq-card")).map(
      (card) => (card as HTMLElement).offsetHeight
    );
    setMaxHeight(Math.max(...cardHeights));
  }, [faqData]);

  return (
    <motion.div
      className="container mx-auto py-10 xl:py-20 px-4 sm:px-0 md:px-8 lg:px-4"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
    >
      <motion.p
        className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium"
        variants={itemVariants}
      >
        {t("Faq.title")}
      </motion.p>
      <motion.p
        className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6"
        variants={itemVariants}
      >
        {t("Faq.subtitle")}
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
        variants={containerVariants}
      >
        {Object.entries(faqData).map(([id, section]: [string, any]) => {
          const list = section.items.map((item: any) => item.title);

          return (
            <motion.div key={id} variants={itemVariants}>
              <FaqCard id={id} title={section.mainTitle} list={list} maxHeight={maxHeight} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Faq;
