import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface InfoBoxProps {
  imageSrc: string;
  buttonText: string;
  link: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ imageSrc, buttonText, link }) => (
    <Link
        href={link} 
        passHref 
        className="w-[240px] flex flex-col  text-center rounded-2xl shadow-lg transition hover:translate-y-[-5%] transition-transform duration-300 ease-in-out"
    >
        <Image
            src={imageSrc}
            alt={imageSrc}
            width={240}
            height={240}
            className="w-3/4 h-auto object-cover md:w-full lg:!w-[240px]"/>
        {/* <button className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition">
            {buttonText}
        </button> */}
    </Link>
);

export default InfoBox;
