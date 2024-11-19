"use client";
import Header from "@/app/components/Header/Header";
import Partners from "../components/Partners/Partners";
import DiseaseList from "../components/DiseaseList/DiseaseList";
import DiscoverBannerSection from "../components/DiscoverSections/DiscoverBannerSection";
import CanabisTypes from "../components/CanabisTypes/CanabisTypes";
import Testimonials from "../components/Testimonials/Testimonials";
import Faq from "../components/Faq/Faq";
import TextImage from "../components/DiscoverSections/TextImage";
import { useTranslations } from "next-intl";
import { testimonals } from "./const";
import trust from "../../../public/trust.webp"

const partnersData = [ 
  {
    id: 0,
    text: "+1000 Patienten in Behandlung",
  }, 
  {
    id: 1,
    text: "+100 Blütensorten immer verfügbar",
  }, 
  { 
    id: 2,
    link: "https://www.trustpilot.com/review/cannabisrezepte24.de",
    content:trust
  }, 
];

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
        firstLi={t('DiscoverSection.Top.Card.list.first')}
        secondLi={t('DiscoverSection.Top.Card.list.second')}
        thirdLi={t('DiscoverSection.Top.Card.list.third')}
        fourthLi={t('DiscoverSection.Top.Card.list.fourth')}
        fifthLi={t('DiscoverSection.Top.Card.list.fifth')}
        />
      <TextImage 
        title={t('DiscoverSection.Bottom.title')}
        subTitle={t('DiscoverSection.Bottom.subtitle')}
        image='/flower.png'
        items={['first', 'second', 'third']}
        className='py-10 md:py-20'
        hasGap
        />
      <TextImage 
        image='/flower.png'
        isReverse
        items={['fourth', 'fifth', 'sixth']}
        className='pb-10 md:pb-20'
        />
      <DiseaseList />
      <CanabisTypes />
      <Testimonials items={testimonals} />
      <Faq />
    </div>
  );
}
