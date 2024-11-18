"use client";
import { useTranslations } from "next-intl";
import CanabisCard from "../CanabisCard/CanabisCard";
import { useScraperData } from "@/app/context/ScraperDataContext";
import { Loader } from "../Loader/Loader";

const CanabisTypes = () => {
  const t = useTranslations("HomePage");
  const { scraperData, loader } = useScraperData();

  return (
    <div className="bg-secondary">
      <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <p className="text-tertiary text-3xl md:text-4xl lg:text-5xl font-medium mb-2 md:mb-0">{t("CanabisTypes.title")}</p>
          <p className="text-lg lg:text-2xl text-white">{t("CanabisTypes.subtitle")}</p>
        </div>
        {loader ? (
          <Loader isWhite />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {scraperData.slice(0, 3).map((item, index) => (
              <CanabisCard key={index} item={item} isBorder />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CanabisTypes;
