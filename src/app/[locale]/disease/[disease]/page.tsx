import { useTranslations } from "next-intl";


const Disease = () => {
    
    const t = useTranslations('BlogPage')

    return (
        <div className="pt-10 pb-20">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <p className="text-secondary text-5xl font-medium">{t('title')}</p>
                    <p className="text-2xl text-secondary">{t('subtitle')}</p>
                </div>
            </div>
        </div>
    )
}

export default Disease;