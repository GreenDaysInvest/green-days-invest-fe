import { useTranslations } from "next-intl";
import flower from '../../../../public/flower.png'
import avatar from '../../../../public/avatar.png'
import BlogCard from "@/app/components/BlogCard/BlogCard";

const blogs = [
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
    {
        image: flower,
        title: 'Blog 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.',
        client: {
            name: 'John Doe',
            position: 'CEO & Founder',
            avatar,
        }
    },
]

const Blog = () => {

    const t = useTranslations('BlogPage')

    return (
        <div className="pt-10 pb-20">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <p className="text-secondary text-5xl font-medium">{t('title')}</p>
                    <p className="text-2xl text-secondary">{t('subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(item => <BlogCard 
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        client={item.client}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blog;