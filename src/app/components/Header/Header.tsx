"use client";
import React from 'react';
import Slider, { Settings } from 'react-slick';
import { slides } from './const';
import Image from 'next/image';

const Header: React.FC = () => {

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <Slider {...settings} className="custom-slider">
          {slides.map((slide) => {
            return (
              <div key={slide.id} className="custom-slide flex flex-row items-center py-[100px]">
                {slide.textOnLeft ? (
                    <>
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-left order-2 lg:order-1">
                        {slide.text}
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
                      <Image
                        src={slide.image}
                        alt={`Slide ${slide.id}`}
                        width={491}
                        height={541}
                        className="w-3/4 h-auto object-cover md:w-full lg:!w-[491px]"/>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="w-full lg:w-1/2 order-1 lg:order-1 flex justify-center lg:justify-start">
                      <Image
                        src={slide.image}
                        alt={`Slide ${slide.id}`}
                        width={491}
                        height={541}
                        className="w-3/4 h-auto object-cover md:w-full lg:!w-[491px]"/>
                    </div>
                    <div className="w-full lg:w-1/2 text-left lg:pl-8 order-2 lg:order-2">
                        {slide.text}
                    </div>
                    </>
                )}
              </div>
            )})
          }
      </Slider>
    </div>
  );
};

export default Header;
