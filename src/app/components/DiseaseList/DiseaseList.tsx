"use client";

import { useTranslations } from "next-intl";
import DiseaseCard from "../DiseaseCard/DiseaseCard";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const DiseaseList = () => {
  const t = useTranslations("HomePage");

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

  return (
    <motion.div
      className="bg-secondary"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-tertiary text-center mb-10 w-full md:w-2/4 mx-auto lg:mb-20"
          variants={itemVariants}
        >
          {t("Disease.title")}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {[
            t("Disease.list.sleepDisorder"),
            t("Disease.list.migraine"),
            t("Disease.list.chronicPain"),
            t("Disease.list.adhd"),
            t("Disease.list.depresion"),
            t("Disease.list.furtherComplaints"),
          ].map((disease, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DiseaseCard title={disease} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DiseaseList;
