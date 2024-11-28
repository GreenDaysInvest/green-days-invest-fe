"use client";

import { useTranslations } from "next-intl";
import BlogCard from "@/app/components/BlogCard/BlogCard";
import blogData from "./blogData.json";
import flower from "../../../../public/flower.png";
import { motion } from "framer-motion";

const Blog = () => {
  const t = useTranslations("BlogPage");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <motion.div
      className="md:pt-0 md:pb-10 pt-10 pb-20"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="container mx-auto py-0 md:py-10 lg:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
        <motion.div
          className="flex justify-between items-end mb-10 lg:mb-20"
          variants={containerVariants}
        >
          <motion.p
            className="text-secondary text-3xl md:text-4xl lg:text-5xl font-medium"
            variants={itemVariants}
          >
            {t("title")}
          </motion.p>
          <motion.p
            className="text-lg lg:text-2xl text-secondary"
            variants={itemVariants}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {blogData.map((blog) => (
            <motion.div key={blog.id} variants={itemVariants}>
              <BlogCard
                id={blog.id}
                image={flower}
                title={blog.title}
                description={blog.description}
                client={blog.client}
                isBackground={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog;
