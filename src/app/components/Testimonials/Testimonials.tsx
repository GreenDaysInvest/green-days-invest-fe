"use client";
import { useTranslations } from "next-intl";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { FC } from "react";
import { Testimonial } from "@/app/types/Testimonial.type";
import Slider from "react-slick";

interface Props {
    items: Testimonial[];
}

const Testimonials: FC<Props> = ({ items }) => {
    const t = useTranslations("HomePage");
  
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
            <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium mb-12">
                {t("Testimonials.title")}
            </p>
            <div className="-mx-2">
                <Slider
                    {...settings}
                    className="custom-slider"
                >
                    {items.map((item, index) => (
                        <div key={index} className="px-2">
                            <TestimonialCard
                                rating={item.rating}
                                description={item.description}
                                client={item.client}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonials;
