"use client";
import CanabisCard from "@/app/components/CanabisCard/CanabisCard";
import { canabis } from "@/app/components/CanabisTypes/CanabisTypes";
import { useTranslations } from "next-intl";


const CannabisAvailability = () => {

    const t = useTranslations('CannabisPage')

    return (
        <div className="pt-10 pb-20">
            <div className="container mx-auto">
                <div className="flex flex-col justify-between items-center mb-10">
                    <p className="text-lightGreen text-5xl text-center font-medium">{t('title')}</p>
                    <p className="text-secondary w-2/4 mx-auto text-center my-6">{t('subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {canabis.map(item => ( 
                        <CanabisCard
                            image={item.image}
                            title={item.title}
                            type={item.type}
                            price={item.price}
                            isBorder />
                    ))}
                </div>
            </div>
        </div>
    )
} 

export default CannabisAvailability;