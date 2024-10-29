"use client";
import DiscoverSection from "@/app/components/DiscoverSection/DiscoverSection";
import Header from "@/app/components/Header/Header";
import { useTranslations } from "next-intl";


const Disease = () => {
    
    const t = useTranslations('BlogPage')

    return (
        <div className="">
            <div className="container mx-auto">
                <DiscoverSection />
            </div>
        </div>
    )
}

export default Disease;