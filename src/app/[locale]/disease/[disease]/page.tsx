"use client";
import DiscoverBannerSection from "@/app/components/DiscoverSections/DiscoverBannerSection";
import TextImage from "@/app/components/DiscoverSections/TextImage";
import { useTranslations } from "next-intl";


const Disease = () => {
    
  const t = useTranslations('HomePage');

    return (
        <div className="">
            <div className="container mx-auto py-20 px-4 sm:px-0 md:px-8 lg:px-0">
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
                <TextImage
                    smallText={t('DiscoverSection.Bottom.smallText')} 
                    title={t('DiscoverSection.Bottom.title')}
                    subTitle={t('DiscoverSection.Bottom.subtitle')}
                    image='/flower.png'
                    isReverse
                    />
                <TextImage
                    smallText={t('DiscoverSection.Bottom.smallText')} 
                    title={t('DiscoverSection.Bottom.title')}
                    subTitle={t('DiscoverSection.Bottom.subtitle')}
                    image='/flower.png'
                    />
                <TextImage
                    smallText={t('DiscoverSection.Bottom.smallText')} 
                    title={t('DiscoverSection.Bottom.title')}
                    subTitle={t('DiscoverSection.Bottom.subtitle')}
                    image='/flower.png'
                    isReverse
                    />
            </div>
        </div>
    )
}

export default Disease;