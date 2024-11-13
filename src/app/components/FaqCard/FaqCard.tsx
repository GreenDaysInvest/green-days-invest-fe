import { Link } from "@/i18n/routing";
import { FC } from "react";

interface Props {
    id: number;
    title: string;
    description: string;
}

const FaqCard:FC<Props> = ({ id, title, description }) => {

    const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 170)}...` 
    : description;


    return (
        <Link href={`/faq/${id}`}>
            <div className="border border-lightGreen rounded-2xl p-6 cursor-pointer">
                <p className="text-secondary font-medium text-2xl mb-4">{title}</p>
                <p className="text-main">{truncatedDescription}</p>
            </div>
        </Link>
    )
}

export default FaqCard;