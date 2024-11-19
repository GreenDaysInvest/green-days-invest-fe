"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface Partner {
  id: number;
  text?: string;
  link?: string; 
  content?: StaticImageData; 
}

interface PartnersSectionProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersSectionProps> = ({ partners }) => {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-white py-5 my-10">
      <div className="relative container mx-auto items-center px-4 sm:px-0 md:px-8 lg:px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {partners.map((partner) => (
            <div key={partner.id} className="px-4 flex items-center justify-center">
              {partner.content ? (
                partner.link ? (
                  <Link href={partner.link}>
                    <Image
                      width={150}
                      height={40}
                      src={partner.content}
                      alt="Partner logo"
                      className="mx-auto"
                    />
                  </Link>
                ) : (
                  <Image
                    width={150}
                    height={40}
                    src={partner.content}
                    alt="Partner logo"
                    className="mx-auto"
                  />
                )
              ) : partner.text ? (
                <div className="w-[200px] mx-auto">
                  <p className="text-secondary text-xl font-semibold text-center">{partner.text}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
