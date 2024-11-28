'use client';

import { usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import faqData from '../faqData.json';
import { motion } from 'framer-motion';

type FaqDataType = typeof faqData;
type FaqKey = keyof FaqDataType;

const isValidFaqKey = (key: string | undefined): key is FaqKey =>
  key !== undefined && key in faqData;

const FaqDetail = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const t = useTranslations('FAQ');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeSection, setActiveSection] = useState<number | null>(null);

  if (!isValidFaqKey(id)) {
    return <p>{t('notFound')}</p>;
  }

  const faqSection = faqData[id];
  const { items } = faqSection;

  const handleScroll = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: 'easeInOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  return (
    <motion.div
      className="pt-10 pb-20"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
        <div className="flex">
          {/* Sidebar */}
          <motion.aside
            className="w-1/4 p-4 hidden lg:flex flex-col"
            variants={itemVariants}
          >
            <h2 className="text-secondary text-lg font-medium uppercase mb-4">
              {t('inThisGuide')}
            </h2>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={`cursor-pointer ${
                    activeSection === index
                      ? 'font-semibold text-lightGreen'
                      : 'text-lightGreen'
                  }`}
                  onClick={() => handleScroll(index)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </motion.aside>

          <motion.main
            className="w-full lg:w-3/4 py-4 px-0 lg:px-4 space-y-8"
            variants={containerVariants}
          >
            {items.map((item, index) => (
              <motion.section
                key={item.id}
                ref={(el) => {
                  sectionRefs.current[index] = el as HTMLDivElement | null;
                }}
                className="mb-8"
                variants={itemVariants}
              >
                <h3 className="text-lg text-secondary font-medium mb-4">
                  {item.title}
                </h3>
                <p className="text-secondary mb-4">{item.description}</p>
                {item.list && (
                  <ul className="list-disc ml-5 space-y-2">
                    {item.list.map((listItem, idx) =>
                      typeof listItem === 'string' ? (
                        <li className="text-lightGreen" key={idx}>
                          {listItem}
                        </li>
                      ) : (
                        <li className="text-lightGreen" key={idx}>
                          <strong>{listItem.title}</strong> {listItem.description}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </motion.section>
            ))}
          </motion.main>
        </div>
      </div>
    </motion.div>
  );
};

export default FaqDetail;
