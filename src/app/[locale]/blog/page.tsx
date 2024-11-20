"use client";

import { useTranslations } from "next-intl";
import BlogCard from "@/app/components/BlogCard/BlogCard";
import blogData from "./blogData.json";

import flower from '../../../../public/flower.png'
const Blog = () => {
    const t = useTranslations('BlogPage');

    return (
        <div className="md:pt-0 md:pb-10 pt-10 pb-20">
            <div className="container mx-auto py-0 md:py-10 lg:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
                <div className="flex justify-between items-end mb-10 lg:mb-20">
                    <p className="text-secondary text-3xl md:text-4xl lg:text-5xl font-medium">{t('title')}</p>
                    <p className="text-lg lg:text-2xl text-secondary">{t('subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogData.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            // image={blog?.image}
                            image={flower}
                            title={blog.title}
                            description={blog.description}
                            client={blog.client}
                            isBackground={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
