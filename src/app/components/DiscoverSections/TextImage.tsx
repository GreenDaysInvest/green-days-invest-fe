"use client";

import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import CardItem from "./CardItem";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface Props {
  smallText?: string;
  title?: string;
  subTitle?: string;
  image: StaticImageData | string;
  isReverse?: boolean;
  items?: string[];
  className?: string;
  hasGap?: boolean;
}

const TextImage: React.FC<Props> = ({
  items,
  title,
  subTitle,
  image,
  isReverse = false,
  className,
  hasGap,
}) => {
  const t = useTranslations("HomePage");

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
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
      className={`${className ? className : ""} container mx-auto px-4 sm:px-0 md:px-8 lg:px-4`}
    >
      <motion.div
        className="lg:w-1/2 mb-10 lg:mb-0"
        variants={itemVariants}
      >
        {title && (
          <p className="text-3xl font-medium text-secondary mt-3">{title}</p>
        )}
        {subTitle && (
          <p className="text-sm text-main mt-3 mb-6 w-3/4">{subTitle}</p>
        )}
      </motion.div>

      <div
        className={`flex flex-col flex-col-reverse ${
          isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <motion.div
          className={`lg:w-1/2 ${hasGap ? "pt-10 md:pt-20" : ""} pt-10 md:pt-20 lg:pt-0 `}
          variants={itemVariants}
        >
          {items?.map((key) => (
            <motion.div key={key} variants={itemVariants}>
              <CardItem
                title={t(`DiscoverSection.Bottom.Keys.${key}.title`)}
                subtitle={t(`DiscoverSection.Bottom.Keys.${key}.subtitle`)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="lg:w-1/2" variants={itemVariants}>
          <Image
            src={image}
            alt="flower"
            width={500}
            height={500}
            className="rounded-xl object-cover lg:w-[90%]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TextImage;
