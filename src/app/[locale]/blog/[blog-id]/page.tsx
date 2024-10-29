"use client";
import Image from "next/image";
import flower from '../../../../../public/flower.png'
import avatar from '../../../../../public/avatar.png'
import BlogCard from "@/app/components/BlogCard/BlogCard";
import { useTranslations } from "next-intl";
import { blogs } from "../consts";


const BlogDetail = () => {
    const t = useTranslations('BlogPage')
    return (
        <div className="pt-10">
            <div className="container mx-auto">
                <div className="flex flex-col items-center">
                    <Image 
                        src={flower} 
                        alt={`${flower}-img`}
                        width={336}
                        height={400}
                        className="rounded-md w-full h-[400px] object-cover mb-6"
                        />
                    <div className="w-3/4">
                        <p className="text-5xl text-secondary text-left mt-8 mb-6">Blog 1</p>
                        <p className="text-main">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text.<br/><br/>
                        </p>
                        <p className="text-main">
                        It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text. <br/><br/>
                        </p>
                        <p className="text-main">It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                        <div className="flex items-center mt-12">
                            <Image 
                                src={avatar} 
                                alt={`${avatar}-name`}
                                width={60}
                                height={60}
                                className="rounded-full" 
                            />
                            <div className="flex flex-col ml-3">
                                <p className="text-secondary text-xl font-bold">John Doe</p>
                                <p className="text-secondary ">Co founder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-tertiary flex flex-col mt-20 py-20">
                <div className="container mx-auto">
                    <p className="text-secondary text-4xl mb-10">
                        {t('latestBlogs')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.slice(0, 3).map(item => <BlogCard 
                            key={item.title}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            client={item.client}
                            isBackground={false}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail;