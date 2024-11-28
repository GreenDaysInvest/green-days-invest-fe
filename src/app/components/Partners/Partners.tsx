"use client";

import { Link } from "@/i18n/routing";
import Image, { StaticImageData } from "next/image";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface Partner {
  id: number;
  text?: string;
  link?: string;
  content?: StaticImageData;
}

interface PartnersSectionProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersSectionProps> = ({ partners }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <motion.section
      className="bg-white py-5 my-10"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              className="px-4 flex items-center justify-center"
              variants={itemVariants}
            >
              {partner.content ? (
                partner.link ? (
                  <Link href={partner.link}>
                    <Image
                      width={150}
                      height={40}
                      src={partner.content}
                      alt="Partner logo"
                      className="mx-auto"
                    />
                  </Link>
                ) : (
                  <Image
                    width={150}
                    height={40}
                    src={partner.content}
                    alt="Partner logo"
                    className="mx-auto"
                  />
                )
              ) : (
                <div className="w-[200px] mx-auto">
                  <p className="text-secondary text-xl font-semibold text-center">
                    {partner.text}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Partners;
