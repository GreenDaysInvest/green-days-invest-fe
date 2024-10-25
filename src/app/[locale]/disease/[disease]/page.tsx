import Header from "@/app/components/Header/Header";
import { useTranslations } from "next-intl";


const Disease = () => {
    
    const t = useTranslations('BlogPage')

    return (
        <div className="pt-10 pb-20">
            <div className="container mx-auto">
                <Header/>
            </div>
        </div>
    )
}

export default Disease;