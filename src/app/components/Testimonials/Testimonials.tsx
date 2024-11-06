"use client";
import { useTranslations } from "next-intl";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { FC, useEffect, useState } from "react";
import { Testimonial } from "@/app/types/Testimonial.type";
import Slider from "react-slick";

interface Props {
    items: Testimonial[];
}

const Testimonials: FC<Props> = ({ items }) => {
    const t = useTranslations("HomePage");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
            <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">
                {t("Testimonials.title")}
            </p>
            <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">
                {t("Testimonials.subtitle")}
            </p>
            <div className="md:grid md:grid-cols-2 md:gap-4">
                {isMobile ? (
                    <Slider {...settings}>
                        {items.map((item, index) => (
                            <div key={index}>
                                <TestimonialCard
                                    rating={item.rating}
                                    description={item.description}
                                    client={item.client}
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    items.map((item, index) => (
                        <TestimonialCard
                            key={index}
                            rating={item.rating}
                            description={item.description}
                            client={item.client}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Testimonials;
