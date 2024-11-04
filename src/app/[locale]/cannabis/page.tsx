"use client";
import CanabisCard from "@/app/components/CanabisCard/CanabisCard";
import { useTranslations } from "next-intl";
import { useScraperData } from "@/app/context/ScraperDataContext";
import { Loader } from "@/app/components/Loader/Loader";

const CannabisAvailability = () => {
  const t = useTranslations("CannabisPage");
  const { scraperData, loader } = useScraperData();

  return (
    <div className="md:pb-10 pt-10 pb-20">
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
        <div className="flex flex-col justify-between items-center mb-10">
          <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">{t("title")}</p>
          <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">{t("subtitle")}</p>
        </div>
        {loader ? (
          <Loader/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {scraperData.map((item, index) => (
              <CanabisCard key={index} item={item} isBorder />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CannabisAvailability;
