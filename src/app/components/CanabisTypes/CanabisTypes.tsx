"use client";
import { useTranslations } from "next-intl"
import CanabisCard from "../CanabisCard/CanabisCard"
import flower from '../../../../public/flower.png'

const canabis = [
    {
        image: flower,
        title: 'Breezy Organics GGL 20/1',
        type: 'Green Gelato',
        price: '7,49'
    },
    {
        image: flower,
        title: 'Breezy Organics GGL 20/1',
        type: 'Green Gelato',
        price: '7,49'
    },
    {
        image: flower,
        title: 'Breezy Organics GGL 20/1',
        type: 'Green Gelato',
        price: '7,49'
    },
]

const CanabisTypes = () => {

    const t = useTranslations('HomePage')

    return (
        <div className="bg-secondary py-20">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <p className="text-tertiary text-5xl font-medium">{t('CanabisTypes.title')}</p>
                    <p className="text-2xl text-white">{t('CanabisTypes.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-6">
                    {canabis.map(item => (
                        <CanabisCard
                            image={item.image}
                            title={item.title}
                            type={item.type}
                            price={item.price} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CanabisTypes