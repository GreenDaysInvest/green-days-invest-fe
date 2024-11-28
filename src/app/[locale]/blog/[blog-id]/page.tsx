"use client";

import Image from "next/image";
import blogData from "../blogData.json";
import { usePathname } from "@/i18n/routing";
import BlogCard from "@/app/components/BlogCard/BlogCard";
import flower from "../../../../../public/flower.png";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const t = useTranslations("BlogPage");
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const blog = blogData.find((b) => b.id === parseInt(id as string));

  if (!blog) return <p>{t("blogNotFound")}</p>;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants}>
      <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
        >
          <motion.div 
            className="rounded-md w-full h-[400px] object-cover mb-6" 
            variants={itemVariants}>
            <Image
              src={flower}
              alt={`${blog.title}-img`}
              width={336}
              height={400}
              className="rounded-md w-full h-[400px] object-cover mb-6"
            />
          </motion.div>
          <motion.div className="w-full lg:w-2/4" variants={itemVariants}>
            <p className="text-4xl md:text-5xl text-secondary text-left mt-8 mb-6">
              {blog.title}
            </p>
            <p className="text-main text-sm md:text-base mb-2">
              {blog.description}
            </p>
            {blog.sections.map((section, index) => (
              <motion.div key={index} className="mb-6" variants={itemVariants}>
                <p className="text-xl font-bold text-secondary mb-2">
                  {section.subtitle}
                </p>
                <p className="text-main text-sm md:text-base">
                  {section.content}
                </p>
              </motion.div>
            ))}
            <motion.div className="flex items-center mt-12" variants={itemVariants}>
              <Image
                src={blog.client.avatar}
                alt={`${blog.client.name}`}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="flex flex-col ml-3">
                <p className="text-secondary text-xl font-bold">
                  {blog.client.name}
                </p>
                <p className="text-secondary">{blog.client.position}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="bg-tertiary flex flex-col mt-6 lg:mt-20 py-20"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
          <motion.p
            className="text-secondary text-3xl lg:text-4xl mb-10"
            variants={itemVariants}
          >
            Latest Blogs
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {blogData.slice(0, 3).map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <BlogCard
                  id={item.id}
                  image={flower}
                  title={item.title}
                  description={item.description}
                  client={item.client}
                  isBackground={false}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogDetail;
