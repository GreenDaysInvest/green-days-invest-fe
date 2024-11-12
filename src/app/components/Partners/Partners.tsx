"use client";
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import Slider from "react-slick";

// Slick settings
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5, // Adjust the number of logos shown per slide
  slidesToScroll: 1,
  autoplay: true, // Enable auto sliding
  autoplaySpeed: 2000, // Set auto sliding interval
  arrows: false, // Disable next/prev arrows
  responsive: [
    {
      breakpoint: 1024, // Breakpoint for tablets and smaller screens
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768, // Breakpoint for mobile screens
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 550, // Breakpoint for mobile screens
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface Partner {
  id: number;
  content: StaticImageData;
}

interface PartnersSectionProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersSectionProps> = ({ partners }) => {
  const t = useTranslations('HomePage');
  return (
    <section className="bg-white py-5 my-10">
      <p className='text-secondary mb-10 text-center font-bold'>
        {t('Partners.title')}
      </p>

      <div className="relative container mx-auto items-center px-4 sm:px-0 md:px-8 lg:px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none z-10"></div>

        <Slider {...sliderSettings} className="custom-slider overflow-hidden z-0">
          {partners.map((partner) => (
            <div key={partner.id} className="px-4"> 
              <Image
                width={100}
                height={50}
                src={partner.content}
                alt='Partner logo'
                className="mx-auto w-auto h-[30px]"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Partners;
