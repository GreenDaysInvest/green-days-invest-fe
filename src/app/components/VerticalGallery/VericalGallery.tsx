import Image from 'next/image';
import img from '../../../../public/flower.png';

const images1 = [
    img,
    img,
    img,
];
const images2 = [
    img,
    img,
    img,
    img,
];

const VerticalGallery = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:space-x-6 w-full lg:w-auto">
            <div className="grid grid-rows-1 lg:[grid-template-rows:none] grid-cols-3 mx-[-50px] lg:mx-0 lg:grid-cols-1 gap-4 lg:gap-5 xl:gap-2 h-[165px] md:h-[180px] lg:h-auto">
                {images1.map((item, index) => (
                    <div key={index} className=" relative w-[165px] h-[165px] lg:w-[235px] lg:h-[235px] xl:w-[260px] xl:h-[260px]">
                        <Image 
                            src={item} 
                            alt={`flower-image-${index}`}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-rows-1 lg:[grid-template-rows:none] grid-cols-4 mx-[-140px] lg:mx-0 lg:grid-cols-1 gap-4 lg:gap-5 xl:gap-6 lg:my-[-130px] h-[165px] md:h-[180px] lg:h-auto">
                {images2.map((item, index) => (
                    <div key={index} className=" relative w-[165px] h-[165px] lg:w-[235px] lg:h-[235px] xl:w-[260px] xl:h-[260px]">
                        <Image   
                            src={item} 
                            alt={`flower-image-${index}`}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalGallery;
