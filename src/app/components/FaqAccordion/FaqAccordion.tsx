import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FC, useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface FaqItem {
  id: string;
  title: string;
  description: string;
}

interface Props {
  idx: string;
  heading: string;
  faqs: FaqItem[];
}

const FaqAccordion: FC<Props> = ({ idx, heading, faqs }) => {

  const t = useTranslations('FAQ');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [heights, setHeights] = useState<number[]>([]); 
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const newHeights = contentRefs.current.map(
      (ref) => ref?.scrollHeight || 0
    );
    setHeights(newHeights);
  }, [faqs]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href={`/faq/${idx}`}>
      <h2 className="text-2xl font-bold text-center text-secondary mb-6">
        {heading}
      </h2>
      </Link>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div key={faq.id} className="border-b border-main overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center w-full px-3 md:px-6 py-4 bg-white text-secondary font-medium text-lg outline-none text-left"
            >
              {faq.title}
              {activeIndex === index ? (
                <FiMinus className="border border-1 border-main p-1 rounded-full w-6 h-6 shrink-0" />
              ) : (
                <FiPlus className="border border-1 border-main p-1 rounded-full w-6 h-6 shrink-0" />
              )}
            </button>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                height: activeIndex === index ? `${heights[index]}px` : "0px",
              }}
            >
              <div className="px-3 md:px-6 py-4 text-main">{faq.description} <Link className="font-bold" href={`/faq/${idx}`}>{t('seeMore')}</Link></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
