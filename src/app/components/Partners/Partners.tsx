import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface Partner {
  id: number;
  type: 'text' | 'image';
  content: StaticImageData | string;
  description?: string;
}

interface PartnersSectionProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersSectionProps> = ({ partners }) => {
  return (
    <section className="bg-main py-20 my-10">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center justify-center text-left">
                {partner.type === 'text' ? (
                <div>
                    <h3 className="text-[30px] font-bold text-white mb-2">{String(partner.content)}</h3>
                    {partner.description && <p className='text-[18px] font-normal text-white'>{partner.description}</p>}
                </div>
                ) : (
                    <Image 
                        width={220}
                        height={165}
                        src={partner.content} 
                        alt='Partner logo' 
                    />
                )}
            </div>
            ))}
        </div>
    </section>
  );
};

export default Partners;
