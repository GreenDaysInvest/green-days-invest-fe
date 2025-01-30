"use client";

import FaqCard from "@/app/components/FaqCard/FaqCard";
import { useTranslations } from "next-intl";
import faqData from "./faqData.json";
import { motion } from "framer-motion";
import FaqAccordion from "@/app/components/FaqAccordion/FaqAccordion";

const FaqPage = () => {
  const t = useTranslations("HomePage");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <motion.div
      className="pt-10 pb-20"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
        <motion.div
          className="flex flex-col justify-between items-center mb-10"
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10"
          variants={containerVariants}
        >
          {Object.entries(faqData).map(([id, section]: [string, any]) => {
            const list = section.items.map((item: any) => item);

            return (
              <motion.div key={id} variants={itemVariants}>
                <FaqAccordion idx={id} heading={section.mainTitle} faqs={list} />;
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FaqPage;
