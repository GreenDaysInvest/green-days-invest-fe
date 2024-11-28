"use client";

import CanabisCard from "@/app/components/CanabisCard/CanabisCard";
import { useTranslations } from "next-intl";
import { useScraperData } from "@/app/context/ScraperDataContext";
import { Loader } from "@/app/components/Loader/Loader";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 9;

const CannabisAvailability = () => {
  const t = useTranslations("CannabisPage");
  const { scraperData, loader } = useScraperData();
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreItems = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedItems((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 1000); // Simulate network delay
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedItems < scraperData.length) {
          loadMoreItems();
        }
      },
      { threshold: 1 }
    );

    const loadMoreButton = document.getElementById("load-more-button");
    if (loadMoreButton) observer.observe(loadMoreButton);

    return () => {
      if (loadMoreButton) observer.unobserve(loadMoreButton);
    };
  }, [displayedItems, scraperData.length]);

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
      className="md:pb-10 pt-10 pb-20"
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
            {t("title")}
          </motion.p>
          <motion.p
            className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6"
            variants={itemVariants}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
        {loader ? (
          <Loader />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <AnimatePresence>
              {scraperData.slice(0, displayedItems).map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <CanabisCard item={item} isBorder />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        <AnimatePresence>
          {isLoadingMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-10"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
        {!isLoadingMore && displayedItems < scraperData.length && (
          <motion.div
            className="flex justify-center mt-10"
            variants={itemVariants}
          >
            <button
              id="load-more-button"
              onClick={loadMoreItems}
              className="px-6 py-3 text-white bg-main rounded-md"
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CannabisAvailability;
