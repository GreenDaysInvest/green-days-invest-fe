"use client";
import { useTranslations } from "next-intl";
import CanabisCard from "../CanabisCard/CanabisCard";
import { useScraperData } from "@/app/context/ScraperDataContext";
import { Loader } from "../Loader/Loader";
import Button from "../Button/Button";
import { useRouter } from "@/i18n/routing";

const CanabisTypes = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const { scraperData, loader } = useScraperData();

  return (
    <div className="bg-secondary">
      <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
        {loader ? (
          <Loader isWhite />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-14">
              {scraperData.slice(0, 3).map((item, index) => (
                <CanabisCard key={index} item={item} isBorder />
              ))}
            </div>
            <Button variant="tertiary" label={t('more')} onClick={() => router.push('/cannabis')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CanabisTypes;
