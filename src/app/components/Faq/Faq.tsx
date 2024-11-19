"use client";
import React from "react";
import { useTranslations } from "next-intl";
import FaqCard from "../FaqCard/FaqCard";
import faqData from "../../[locale]/faq/faqData.json";

const Faq: React.FC = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
      <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">
        {t("Faq.title")}
      </p>
      <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">
        {t("Faq.subtitle")}
      </p>

      <div className="grid grid-cols-2 gap-6 mt-10">
        {Object.entries(faqData).map(([id, section]: [string, any]) => {

          const list = section.items.map((item: any) => item.title);

          return (
            <FaqCard
              key={id}
              id={id}
              title={section.mainTitle}
              list={list}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
