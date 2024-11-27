"use client";
import { usePathname } from "@/i18n/routing";
import topics from "./diseaseData.json";
import Image from "next/image";
import { TiTickOutline } from "react-icons/ti";

type Section = {
  title: string;
  subtitle?: string;
  list?: string[];
};

type Topics = Record<string, { sections: Section[] }>;

const diseaseTopics: Topics = topics as Topics;

const Disease = () => {
  const pathname = usePathname();
  const title = pathname.split('/').pop() || "";

  const diseases: Record<string, string> = {
    "sleep-disorder": "Schlafstörungen",
    "migrane": "Migräne",
    "chronic-pain": "Chronische Schmerzen",
    "adhd": "ADHS",
    "depression": "Depressionen",
    "further-complaints": "Weitere Krankheiten",
  };

  const diseaseKey = diseases[title];
  const content = diseaseKey && diseaseTopics[diseaseKey] ? diseaseTopics[diseaseKey] : { sections: [] };

  return (
    <div className="">
        <div className="container mx-auto pt-0 pb-20 px-4 sm:px-0 md:px-8 lg:px-4">
            <h1 className="text-center text-secondary text-3xl md:text-4xl lg:text-5xl mt-14 mb-8 font-normal">
                {content.sections[0]?.title}
            </h1>
            <p className="text-center text-sm md:text-base text-secondary mt-5 mb-20 w-3/4 lg:w-1/2 mx-auto">
                {content.sections[0]?.subtitle}
            </p>

            {content.sections.slice(1).map((section, index) => (
                <div
                    key={index}
                    className={`flex flex-col flex-col-reverse mb-20 ${index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                >
                    <div className={`lg:w-1/2 pt-20 lg:pt-0 ${
                            index % 2 !== 0 ? "ps-4 xl:ps-0" : ""
                        }`}>
                        <h1 className="text-left text-lightGreen text-3xl font-normal mb-4">
                            {section.title}
                        </h1>
                        {section.subtitle && <p className="text-left text-sm md:text-base text-secondary mb-2 w-3/4">
                            {section.subtitle}
                        </p>}
                        <ul className="w-3/4">
                            {section.list?.map((item, index) => (
                                <li key={index} className="flex items-center text-sm lg:text-base text-main mb-2">
                                    <TiTickOutline className="text-main w-5 h-5 flex-shrink-0 mr-2" />
                                    <span className="flex-1">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:w-1/2">
                        <Image
                            src="/flower.png"
                            alt="flower"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Disease;
