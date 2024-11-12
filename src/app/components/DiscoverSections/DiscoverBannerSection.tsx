import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";

interface Props {
    title: string;
    subTitle: string;
    image: StaticImageData | string;
    cardTitle: string;
    cardSubTitle: string
}

const DiscoverBannerSection: React.FC<Props> = ({ title, subTitle, image, cardTitle, cardSubTitle }) => {
    
    const t = useTranslations('HomePage');

    return (
        <>
            <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
                <h1 className="text-center text-lightGreen text-3xl md:text-4xl lg:text-5xl font-normal">
                    {title}
                </h1>
                <p className="text-center text-sm md:text-base text-secondary mt-5 mb-10 w-3/4 lg:w-1/2 mx-auto">
                    {subTitle}
                </p>
                <div className="rounded-t-2xl bg-tertiary w-full flex justify-center items-end overflow-hidden">
                    <div className="flex flex-col md:flex-row px-10 pt-10 lg:px-20 lg:pt-20 xl:px-40 xl:pt-40 md:space-x-10 xl:space-x-20">
                        <Image
                            src={image}
                            alt={`${image}-flower`}
                            width={336}
                            height={350}
                            className="w-[180px] h-[180px] md:w-[230px] md:h-[230px] lg:w-[290px] lg:h-[290px] mb-0 md:mb-[-10px]"
                        />
                        <div className="flex flex-col mt-10 md:mt-0">
                            <p className="text-secondary text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-4 md:mb-8">
                                {cardTitle}
                            </p>
                            <p className="text-sm lg:text-base text-main mb-10 md:mb-0">
                                {cardSubTitle}

                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DiscoverBannerSection;
