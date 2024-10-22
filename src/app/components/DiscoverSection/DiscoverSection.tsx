import { useTranslations } from "next-intl";
import Image from "next/image";
import CardItem from "./CardItem";

const DiscoverSection: React.FC = () => {
    
    const t = useTranslations('HomePage');

    return (
        <>
            <div className="container mx-auto py-20">
                <h1 className="text-center text-lightGreen text-5xl font-normal">
                    {t('DiscoverSection.Top.title')}
                </h1>
                <p className="text-center text-secondary mt-5 mb-10 w-1/2 mx-auto">
                    {t('DiscoverSection.Top.subtitle')}
                </p>
                <div className="rounded-t-2xl bg-tertiary w-full flex justify-center items-end overflow-hidden">
                    <div className="flex px-40 pt-40 space-x-20">
                        <Image
                            src="/flower.png"
                            alt="flower"
                            width={336}
                            height={350}
                            className="mb-[-10px]"
                        />
                        <div className="flex flex-col">
                            <p className="text-secondary text-5xl font-medium mb-8">
                                {t('DiscoverSection.Top.Card.title')}
                            </p>
                            <p className="text-main">
                                {t('DiscoverSection.Top.Card.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-20">
                <div className="w-1/2">
                    <p className="text-sm uppercase text-lightGreen">
                        {t('DiscoverSection.Bottom.smallText')}
                    </p>
                    <p className="text-3xl font-medium text-secondary mt-3">
                        {t('DiscoverSection.Bottom.title')}
                    </p>
                    <p className="text-sm text-main mb-6 w-3/4">
                        {t('DiscoverSection.Bottom.subtitle')}
                    </p>
                </div>

                <div className="flex">
                    <div className="w-1/2 pt-20">
                        {['first', 'second', 'third'].map((key) => (
                            <CardItem
                                key={key}
                                title={t(`DiscoverSection.Bottom.Keys.${key}.title`)}
                                subtitle={t(`DiscoverSection.Bottom.Keys.${key}.subtitle`)}
                            />
                        ))}
                    </div>

                    <div className="w-1/2">
                        <Image
                            src='/flower.png'
                            alt="flower"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiscoverSection;
