"use client";
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';

const sections = [
  'Cut Rite Lawn Care',
  'Murray\'s Discount Auto Stores',
  'Britches of Georgetown',
  'Pro Property Maintenance',
  'Electronic Geek',
  'Sofa Express',
  'Finast'
];

const FaqDetail = () => {
    
    const t = useTranslations('FAQ');
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [activeSection, setActiveSection] = useState<number | null>(null);

    const handleScroll = (index: number) => {
        setActiveSection(index);
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pt-10 pb-20">
            <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
                <div className="flex">
                    <aside className="w-1/4 p-4 hidden lg:flex flex-col">
                        <h2 className="text-secondary text-lg font-medium uppercase mb-4">{t('inThisGuide')}</h2>
                        <ul className="space-y-2">
                        {sections.map((section, index) => (
                            <li
                            key={section}
                            className={`cursor-pointer ${activeSection === index ? 'font-semibold text-lightGreen' : 'text-lightGreen'}`}
                            onClick={() => handleScroll(index)}
                            >
                            {section}
                            </li>
                        ))}
                        </ul>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4 py-4 px-0 lg:px-4 space-y-8">
                        {sections.map((section, index) => (
                            <section
                                key={section}
                                ref={(el) => {
                                sectionRefs.current[index] = el as HTMLDivElement | null;
                                }}
                                className="mb-8"
                            >
                                <h3 className="text-lg text-secondary font-medium mb-4">Case Study - {section}</h3>
                                <p className="text-secondary">
                                Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim...
                                </p>
                            </section>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default FaqDetail;
