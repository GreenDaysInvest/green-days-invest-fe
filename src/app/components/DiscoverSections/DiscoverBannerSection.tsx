"use client";

import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { TiTickOutline } from "react-icons/ti";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface Props {
  title: string;
  subTitle: string;
  image: StaticImageData | string;
  cardTitle: string;
  firstLi: string;
  secondLi: string;
  thirdLi: string;
  fourthLi: string;
  fifthLi: string;
}

const DiscoverBannerSection: React.FC<Props> = ({
  title,
  subTitle,
  image,
  cardTitle,
  firstLi,
  secondLi,
  thirdLi,
  fourthLi,
  fifthLi,
}) => {
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
      className="container mx-auto pt-5 pb-10 xl:pb-20 px-4 sm:px-0 md:px-8 lg:px-4"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1
        className="text-center text-lightGreen text-3xl md:text-4xl lg:text-5xl font-normal"
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-center text-sm md:text-base text-secondary mt-5 mb-14 w-3/4 lg:w-1/2 mx-auto"
        variants={itemVariants}
        dangerouslySetInnerHTML={{ __html: subTitle }}
      />
      <motion.div
        className="rounded-2xl bg-tertiary w-full flex justify-center items-center"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row p-10 lg:p-20 xl:p-32 md:space-x-10 xl:space-x-20">
          <motion.div
            className="w-full max-w-full sm:max-w-[290px] h-auto md:max-w-[230px] lg:max-w-[290px]"
            variants={itemVariants}
          >
            <Image
              src={image}
              alt={`${image}-flower`}
              width={336}
              height={350}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.div className="flex flex-col mt-10 md:mt-0" variants={itemVariants}>
            <motion.p
              className="text-secondary text-2xl font-medium mb-4"
              variants={itemVariants}
            >
              {cardTitle}
            </motion.p>
            <motion.ul variants={containerVariants}>
              {[firstLi, secondLi, thirdLi, fourthLi, fifthLi].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center text-sm lg:text-base text-main mb-2"
                  variants={itemVariants}
                >
                  <TiTickOutline className="text-main mr-2" /> {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiscoverBannerSection;
