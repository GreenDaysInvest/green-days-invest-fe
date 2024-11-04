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
                <h1 className="text-center text-lightGreen text-5xl font-normal">
                    {title}
                </h1>
                <p className="text-center text-secondary mt-5 mb-10 w-1/2 mx-auto">
                    {subTitle}
                </p>
                <div className="rounded-t-2xl bg-tertiary w-full flex justify-center items-end overflow-hidden">
                    <div className="flex px-40 pt-40 space-x-20">
                        <Image
                            src={image}
                            alt={`${image}-flower`}
                            width={336}
                            height={350}
                            className="mb-[-10px]"
                        />
                        <div className="flex flex-col">
                            <p className="text-secondary text-3xl md:text-4xl lg:text-5xl font-medium mb-8">
                                {cardTitle}
                            </p>
                            <p className="text-main">
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
