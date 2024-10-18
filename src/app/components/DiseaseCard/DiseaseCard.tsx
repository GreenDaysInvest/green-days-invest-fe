import { FC } from 'react';
import Image from 'next/image';

interface DiseaseCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const DiseaseCard: FC<DiseaseCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
      <Image
        src={imageUrl}
        alt={title}
        width={80}
        height={80}
        className="mb-4"
      />
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-center text-gray-500 mb-4">{description}</p>
      <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all">
        Learn more
      </button>
    </div>
  );
};

export default DiseaseCard;
