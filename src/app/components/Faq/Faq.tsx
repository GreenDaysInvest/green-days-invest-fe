"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import FAQItem from './FaqItem';
import FaqCard from '../FaqCard/FaqCard';
import { topics } from '@/app/[locale]/faq/const';

const Faq: React.FC = () => {
  const t = useTranslations('HomePage');
  
  const faqItems = [
    { question: t('Faq.items.q1'), answer: t('Faq.items.a1') },
    { question: t('Faq.items.q2'), answer: t('Faq.items.a2') },
    { question: t('Faq.items.q3'), answer: t('Faq.items.a3') },
    { question: t('Faq.items.q4'), answer: t('Faq.items.a4') },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto py-10 md:py-20 px-4 sm:px-0 md:px-8 lg:px-4">
      <p className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium">{t('Faq.title')}</p>
      <p className="text-secondary md:w-3/4 lg:w-2/4 mx-auto text-center my-6">{t('Faq.subtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {topics.map((item) => <FaqCard id={item.id} title={item.title} description={item.description} />)}
      </div>
      {/* <div className="w-full max-w-4xl mx-auto mt-10">
        {faqItems.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Faq;
