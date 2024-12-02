import { useTranslations } from "next-intl";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { FC, useRef, useEffect, useState } from "react";
import { Testimonial } from "@/app/types/Testimonial.type";
import Slider from "react-slick";
import { motion, useInView } from "framer-motion";

interface Props {
  items: Testimonial[];
}

const Testimonials: FC<Props> = ({ items }) => {
  const t = useTranslations("HomePage");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [maxHeight, setMaxHeight] = useState<number>(250); // Default to 250 for mobile

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

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

  useEffect(() => {
    const updateMaxHeight = () => {
      if (window.innerWidth <= 550) {
        setMaxHeight(300);
      } else {
        const cardHeights = Array.from(
          document.querySelectorAll(".testimonial-card")
        ).map((card) => (card as HTMLElement).offsetHeight);
        setMaxHeight(Math.max(...cardHeights));
      }
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight); 

    return () => {
      window.removeEventListener("resize", updateMaxHeight); 
    };
  }, [items]);

  return (
    <motion.div
      className="container mx-auto py-10 xl:py-20 px-4 sm:px-0 md:px-8 lg:px-4"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
    >
      <motion.p
        className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium mb-12"
        variants={itemVariants}
      >
        {t("Testimonials.title")}
      </motion.p>
      <motion.div className="-mx-2" variants={itemVariants}>
        <Slider {...settings} className="custom-slider">
          {items.map((item, index) => (
            <motion.div key={index} className="px-2" variants={itemVariants}>
              <TestimonialCard
                rating={item.rating}
                description={item.description}
                client={item.client}
                maxHeight={maxHeight}
              />
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </motion.div>
  );
};

export default Testimonials;
