"use client";

import { usePathname } from "@/i18n/routing";
import topics from "./diseaseData.json";
import Image from "next/image";
import { TiTickOutline } from "react-icons/ti";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

type Section = {
  title: string;
  subtitle?: string;
  list?: string[];
};

type Topics = Record<string, { sections: Section[] }>;

const diseaseTopics: Topics = topics as Topics;

const Disease = () => {
  const pathname = usePathname();
  const title = pathname.split("/").pop() || "";

  const diseases: Record<string, string> = {
    "sleep-disorder": "Schlafstörungen",
    "migrane": "Migräne",
    "chronic-pain": "Chronische Schmerzen",
    "adhd": "ADHS",
    "depression": "Depressionen",
    "further-complaints": "Weitere Krankheiten",
  };

  const diseaseKey = diseases[title];
  const content = diseaseKey && diseaseTopics[diseaseKey] ? diseaseTopics[diseaseKey] : { sections: [] };

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
      className=""
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col justify-between items-center mb-20 lg:mb-32 bg-secondary px-4"
        variants={containerVariants}
      >
        <motion.p
          className="text-tertiary text-3xl md:text-4xl lg:text-5xl text-center font-normal mt-20"
          variants={itemVariants}
        >
          {content.sections[0]?.title}
        </motion.p>
        <motion.p
          className="text-white text-lg md:w-3/4 lg:w-2/4 mx-auto text-center mt-10 mb-20"
          variants={itemVariants}
        >
          {content.sections[0]?.subtitle}
        </motion.p>
      </motion.div>
      <div className="container mx-auto pt-0 pb-20 px-4 sm:px-0 md:px-8 lg:px-4">
      

        {content.sections.slice(1).map((section, index) => (
          <motion.div
            key={index}
            className={`flex flex-col flex-col-reverse mb-10 lg:mb-20 ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
            variants={containerVariants}
          >
            <motion.div
              className={`lg:w-1/2 pt-10 lg:pt-0 ${
                index % 2 !== 0 ? "ps-0 lg:ps-4 xl:ps-0" : ""
              }`}
              variants={itemVariants}
            >
              <h1 className="text-left text-lightGreen text-3xl font-normal mb-4">
                {section.title}
              </h1>
              {section.subtitle && (
                <p className="text-left text-sm md:text-base text-secondary mb-2 w-3/4">
                  {section.subtitle}
                </p>
              )}
              <ul className="w-3/4">
                {section.list?.map((item, listIndex) => (
                  <motion.li
                    key={listIndex}
                    className="flex items-center text-sm lg:text-base text-main mb-2"
                    variants={itemVariants}
                  >
                    <TiTickOutline className="text-main w-5 h-5 flex-shrink-0 mr-2" />
                    <span className="flex-1">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="lg:w-1/2" variants={itemVariants}>
              <Image src="/flower.png" alt="flower" width={200} height={200} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Disease;
