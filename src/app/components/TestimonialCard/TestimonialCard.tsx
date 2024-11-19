import { Client } from "@/app/types/Client.type";
import Image, { StaticImageData } from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface Props {
    rating: number;
    description: string;
    client: Client;
}

const TestimonialCard: React.FC<Props> = ({ rating, description, client: { name, avatar } }) => {

    
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <FaStar key={i} className="text-tertiary" />
                ) : (
                    <FaRegStar key={i} className="text-tertiary" />
                )
            );
        }
        return stars;
    };

    return (
        <div className="h-[250px] flex justify-between flex-col bg-main rounded-lg p-5">
            <div>
                <div className="flex">
                    {renderStars()} 
                </div>
                <p className="text-sm text-white mt-4 mb-3">{description}</p>
            </div>
            <div className="flex items-center mt-3">
                <Image 
                    src={avatar} 
                    alt={name}
                    width={48}
                    height={48}
                    className="rounded-full" 
                />
                <div className="flex flex-col ml-3">
                    <p className="text-white font-bold">{name}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
