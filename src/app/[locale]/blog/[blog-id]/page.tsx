"use client";
import Image from "next/image";
import blogData from "../blogData.json";
import { usePathname } from "@/i18n/routing";
import BlogCard from "@/app/components/BlogCard/BlogCard";
import flower from '../../../../../public/flower.png'

const BlogDetail = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const blog = blogData.find(b => b.id === parseInt(id as string));

    if (!blog) return <p>Blog not found</p>;

    return (
        <div>
            <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
                <div className="flex flex-col items-center">
                    <Image
                        src={flower}
                        // src={blog?.image}
                        alt={`${blog.title}-img`}
                        width={336}
                        height={400}
                        className="rounded-md w-full h-[400px] object-cover mb-6"
                    />
                    <div className="w-full lg:w-2/4">
                        <p className="text-4xl md:text-5xl text-secondary text-left mt-8 mb-6">{blog.title}</p>
                        <p className="text-main text-sm md:text-base mb-2">{blog.description}</p>
                        {blog.sections.map((section, index) => (
                            <div key={index} className="mb-6">
                                <p className="text-xl font-bold text-secondary mb-2">{section.subtitle}</p>
                                <p className="text-main text-sm md:text-base">{section.content}</p>
                            </div>
                        ))}
                        <div className="flex items-center mt-12">
                            <Image
                                src={blog.client.avatar}
                                alt={`${blog.client.name}`}
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                            <div className="flex flex-col ml-3">
                                <p className="text-secondary text-xl font-bold">{blog.client.name}</p>
                                <p className="text-secondary">{blog.client.position}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-tertiary flex flex-col mt-6 lg:mt-20 py-20">
                <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
                    <p className="text-secondary text-3xl lg:text-4xl mb-10">Latest Blogs</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogData.slice(0, 3).map(item => (
                            <BlogCard
                                key={item.id}
                                id={item.id}
                                image={flower}
                                // image={item?.image}
                                title={item.title}
                                description={item.description}
                                client={item.client}
                                isBackground={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
