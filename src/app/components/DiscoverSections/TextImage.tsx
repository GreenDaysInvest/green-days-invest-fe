import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import CardItem from "./CardItem";

interface Props {
    smallText?: string;
    title: string;
    subTitle: string;
    image: StaticImageData | string;
    isReverse?: boolean
}

const TextImage: React.FC<Props> = ({ smallText, title, subTitle, image, isReverse = false }) => {
    
    const t = useTranslations('HomePage');

    return (
        <>
        <div className={`container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4`}>
            <div className="w-1/2">
                {smallText && <p className="text-sm uppercase text-lightGreen">
                    {smallText}
                </p>}
                <p className="text-3xl font-medium text-secondary mt-3">
                    {title}
                </p>
                <p className="text-sm text-main mt-3 mb-6 w-3/4">
                    {subTitle}
                </p>
            </div>

            <div className={`flex ${isReverse ? 'flex-row-reverse' : 'flex-row'} `}>
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
                        src={image}
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

export default TextImage;
