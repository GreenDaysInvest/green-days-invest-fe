import { Client } from "@/app/types/Client.type";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface Props {
  rating: number;
  description: string;
  client: Client;
  maxHeight?: number; // Optional maxHeight prop
}

const TestimonialCard: React.FC<Props> = ({ rating, description, client: { name, avatar }, maxHeight }) => {
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
    <div
      className="flex flex-col justify-between bg-main rounded-lg p-5 testimonial-card"
      style={{ minHeight: maxHeight ? `${maxHeight}px` : "auto" }}
    >
      <div>
        <div className="flex">{renderStars()}</div>
        <p className="text-sm text-white mt-4 mb-3">{description}</p>
      </div>
      <div className="flex items-center mt-3">
        <FaRegUserCircle className="text-2xl" />
        <div className="flex flex-col ml-3">
          <p className="text-white font-bold">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
