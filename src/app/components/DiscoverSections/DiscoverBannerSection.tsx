import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { TiTickOutline } from "react-icons/ti";

interface Props {
    title: string;
    subTitle: string;
    image: StaticImageData | string;
    cardTitle: string;
    firstLi: string
    secondLi: string
    thirdLi: string
    fourthLi: string
    fifthLi: string
}

const DiscoverBannerSection: React.FC<Props> = ({ title, subTitle, image, cardTitle, firstLi, secondLi, thirdLi, fourthLi, fifthLi }) => {
    
    const t = useTranslations('HomePage');

    return (
        <>
            <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
                <h1 className="text-center text-lightGreen text-3xl md:text-4xl lg:text-5xl font-normal">
                    {title}
                </h1>
                <p className="text-center text-sm md:text-base text-secondary mt-5 mb-14 w-3/4 lg:w-1/2 mx-auto">
                    {subTitle}
                </p>
                <div className="rounded-2xl bg-tertiary w-full flex justify-center items-center">
                    <div className="flex flex-col md:flex-row p-10 lg:p-20 xl:p-32 md:space-x-10 xl:space-x-20">
                        <Image
                            src={image}
                            alt={`${image}-flower`}
                            width={336}
                            height={350}
                            className="w-[180px] h-[180px] md:w-[230px] md:h-[230px] lg:w-[290px] lg:h-[290px] mb-0 md:mb-[-10px]"
                        />
                        <div className="flex flex-col mt-10 md:mt-0">
                            <p className="text-secondary text-2xl font-medium mb-4 ">
                                {cardTitle}
                            </p>
                            <ul>
                                <li className="flex items-center text-sm lg:text-base text-main mb-2"><TiTickOutline className="text-main mr-2"/> {firstLi}</li>
                                <li className="flex items-center text-sm lg:text-base text-main mb-2"><TiTickOutline className="text-main mr-2"/> {secondLi}</li>
                                <li className="flex items-center text-sm lg:text-base text-main mb-2"><TiTickOutline className="text-main mr-2"/> {thirdLi}</li>
                                <li className="flex items-center text-sm lg:text-base text-main mb-2"><TiTickOutline className="text-main mr-2"/> {fourthLi}</li>
                                <li className="flex items-center text-sm lg:text-base text-main mb-2"><TiTickOutline className="text-main mr-2"/> {fifthLi}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DiscoverBannerSection;
