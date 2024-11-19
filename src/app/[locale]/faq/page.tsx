"use client";
import FaqCard from "@/app/components/FaqCard/FaqCard";
import { useTranslations } from "next-intl";
import faqData from "./faqData.json";


const FaqPage = () => {

    const t = useTranslations('HomePage')

    return ( 
        <div className="pt-10 pb-20">
          <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
            <div className="flex flex-col justify-between items-center mb-10 ">
                <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">{t('Faq.title')}</p>
                <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">{t('Faq.subtitle')}</p>
            </div>

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
        </div>
    )
}

export default FaqPage;