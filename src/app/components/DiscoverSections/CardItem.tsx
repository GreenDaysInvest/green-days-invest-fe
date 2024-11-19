import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaArrowRight } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";

interface CardItemProps {
    title: string;
    subtitle: string;
}

const CardItem: React.FC<CardItemProps> = ({ title, subtitle }) => {
    const t = useTranslations('HomePage')
    return (
        <div className="flex items-start mb-10">
            <div className="rounded-md bg-tertiary p-4 mr-4">
                <IoBagHandleOutline className="text-main" />
            </div>
            <div className="flex flex-col w-3/4">
                <p className="text-xl font-medium text-secondary">{title}</p>
                <p className="text-main text-sm md:text-base my-2">{subtitle}</p>
            </div>
        </div>
    );
};

export default CardItem;