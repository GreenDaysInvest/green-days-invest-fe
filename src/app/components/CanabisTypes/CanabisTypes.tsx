"use client";
import { useTranslations } from "next-intl";
import CanabisCard from "../CanabisCard/CanabisCard";
import { useScraperData } from "@/app/context/ScraperDataContext";
import { Loader } from "../Loader/Loader";

const CanabisTypes = () => {
  const t = useTranslations("HomePage");
  const { scraperData, loader } = useScraperData();

  return (
    <div className="bg-secondary py-20">
      <div className="container mx-auto py-20 px-4 sm:px-0 md:px-8 lg:px-0">
        <div className="flex justify-between items-end mb-10">
          <p className="text-tertiary text-5xl font-medium">{t("CanabisTypes.title")}</p>
          <p className="text-2xl text-white">{t("CanabisTypes.subtitle")}</p>
        </div>
        {loader ? (
          <Loader isWhite />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-6">
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
