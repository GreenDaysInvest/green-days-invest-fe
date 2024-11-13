"use client";
import FaqCard from "@/app/components/FaqCard/FaqCard";
import { useTranslations } from "next-intl";

export const topics = [
    {
        id: 1,
        title: "Breezy Organics GGL 20/1",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques."
    },
    {
        id: 2,
        title: "Breezy Organics GGL 20/1",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques."
    },
    {
        id: 3,
        title: "Breezy Organics GGL 20/1",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques."
    },
    {
        id: 4,
        title: "Breezy Organics GGL 20/1",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques."
    },
    {
        id: 5,
        title: "Breezy Organics GGL 20/1",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques."
    },
    {
        id: 6,
        title: "Breezy Organics GGL 20/1",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques. Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques."
    },
]



const FaqPage = () => {

    const t = useTranslations('HomePage')

    return ( 
        <div className="pt-10 pb-20">
          <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
            <div className="flex flex-col justify-between items-center mb-10 ">
                <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">{t('Faq.title')}</p>
                <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">{t('Faq.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((item) => <FaqCard id={item.id} title={item.title} description={item.description} />)}
            </div>
          </div>
        </div>
    )
}

export default FaqPage;