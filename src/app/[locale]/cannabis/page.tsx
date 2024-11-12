"use client";
import CanabisCard from "@/app/components/CanabisCard/CanabisCard";
import { useTranslations } from "next-intl";
import { useScraperData } from "@/app/context/ScraperDataContext";
import { Loader } from "@/app/components/Loader/Loader";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 9;

const CannabisAvailability = () => {
  const t = useTranslations("CannabisPage");
  const { scraperData, loader } = useScraperData();
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreItems = () => {
    setIsLoadingMore(true); // Show loader before loading more items
    setTimeout(() => {
      setDisplayedItems((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false); // Hide loader after items are loaded
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

  return (
    <div className="md:pb-10 pt-10 pb-20">
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
        <div className="flex flex-col justify-between items-center mb-10">
          <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">{t("title")}</p>
          <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">{t("subtitle")}</p>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {scraperData.slice(0, displayedItems).map((item, index) => (
                <CanabisCard key={index} item={item} isBorder />
              ))}
            </div>
            {isLoadingMore && <Loader />} {/* Show loader when loading more items */}
            {!isLoadingMore && displayedItems < scraperData.length && (
              <div className="flex justify-center mt-10">
                <button
                  id="load-more-button"
                  onClick={loadMoreItems}
                  className="px-6 py-3 text-white bg-main rounded-md"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CannabisAvailability;
