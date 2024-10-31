import { useTranslations } from "next-intl";
import avatar from "../../../../public/avatar.png"
import TestimonialCard from "../TestimonialCard/TestimonialCard";

const testimonals = [
    {
        rating: 4,
        description: "“Lorem ipsum dolor sit amet dolor sit consectetur eget maecenas sapien fusce egestas risus purus suspendisse turpis volutpat onare”",
        client: {
            image: avatar,
            name: "Brian Clark",
            position: "Founder"
        }
    },
    {
        rating: 5,
        description: "“Lorem ipsum dolor sit amet dolor sit consectetur eget maecenas sapien fusce egestas risus purus suspendisse turpis volutpat onare”",
        client: {
            image: avatar,
            name: "Brian Clark",
            position: "Founder"
        }
    }
]

const Testimonials = () => {
    const t = useTranslations('HomePage')
    return (
        <div className="container mx-auto py-20 px-4 sm:px-0 md:px-8 lg:px-0">
            <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">{t('Testimonials.title')}</p>
            <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">{t('Testimonials.subtitle')}</p>
            <div className="grid grid-cols-2 space-x-4">
                {testimonals.map((item, _id) => 
                    <TestimonialCard 
                        key={_id}
                        rating={item.rating}
                        description={item.description}
                        client={item.client} />
                )}
            </div>
        </div>
    )
}

export default Testimonials;