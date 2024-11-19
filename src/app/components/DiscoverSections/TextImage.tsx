import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import CardItem from "./CardItem";

interface Props {
    smallText?: string;
    title?: string;
    subTitle?: string;
    image: StaticImageData | string;
    isReverse?: boolean
    items?: string[]
    className?: string;
    hasGap?: boolean;
}

const TextImage: React.FC<Props> = ({ items, title, subTitle, image, isReverse = false, className, hasGap }) => {
    
    const t = useTranslations('HomePage');

    return (
        <>
        <div className={`${className ? className : ''} container mx-auto px-4 sm:px-0 md:px-8 lg:px-4 `}>
            <div className="lg:w-1/2 mb-10 lg:mb-0">
                {title && <p className="text-3xl font-medium text-secondary mt-3">
                    {title}
                </p>}
                {subTitle && <p className="text-sm text-main mt-3 mb-6 w-3/4">
                    {subTitle}
                </p>}
            </div>

            <div className={`flex flex-col flex-col-reverse ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} `}>
                <div className={`lg:w-1/2 ${hasGap && 'pt-20'} pt-20 lg:pt-0 ${isReverse ? 'ps-4 xl:ps-0' : ''}`}>
                    {items?.map((key) => (
                        <CardItem
                            key={key}
                            title={t(`DiscoverSection.Bottom.Keys.${key}.title`)}
                            subtitle={t(`DiscoverSection.Bottom.Keys.${key}.subtitle`)}
                        />
                    ))}
                </div>

                <div className="lg:w-1/2">
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
