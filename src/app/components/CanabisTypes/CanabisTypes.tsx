"use client";

import { useTranslations } from "next-intl";
import CanabisCard from "../CanabisCard/CanabisCard";
import { useScraperData } from "@/app/context/ScraperDataContext";
import { Loader } from "../Loader/Loader";
import Button from "../Button/Button";
import { useRouter } from "@/i18n/routing";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const CanabisTypes = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const { scraperData, loader } = useScraperData();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
      className="bg-secondary"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
        {loader ? (
          <motion.div variants={itemVariants}>
            <Loader isWhite />
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center"
            variants={containerVariants}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-14"
              variants={containerVariants}
            >
              {scraperData.slice(0, 3).map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <CanabisCard item={item} isBorder />
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="tertiary"
                label={t("more")}
                onClick={() => router.push("/cannabis")}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CanabisTypes;
