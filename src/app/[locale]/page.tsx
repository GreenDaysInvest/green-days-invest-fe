"use client";
import Header from "@/app/components/Header/Header";
import Partners from "../components/Partners/Partners";
import { partnersData } from "../consts";
import DiseaseList from "../components/DiseaseList/DiseaseList";
import DiscoverBannerSection from "../components/DiscoverSections/DiscoverBannerSection";
import CanabisTypes from "../components/CanabisTypes/CanabisTypes";
import Testimonials from "../components/Testimonials/Testimonials";
import Faq from "../components/Faq/Faq";
import TextImage from "../components/DiscoverSections/TextImage";
import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations('HomePage');

  return (
    <div className="">
      <Header />
      <Partners partners={partnersData} />
      <DiscoverBannerSection
        title={t('DiscoverSection.Top.title')}
        subTitle={t('DiscoverSection.Top.subtitle')}
        image='/flower.png'
        cardTitle={t('DiscoverSection.Top.Card.title')}
        cardSubTitle={t('DiscoverSection.Top.Card.subtitle')}
        />
      <TextImage 
        smallText={t('DiscoverSection.Bottom.smallText')} 
        title={t('DiscoverSection.Bottom.title')}
        subTitle={t('DiscoverSection.Bottom.subtitle')}
        image='/flower.png'
        />
      <DiseaseList />
      <CanabisTypes />
      <Testimonials />
      <Faq />
    </div>
  );
}
