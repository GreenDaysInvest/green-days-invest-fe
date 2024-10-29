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
        <div className="flex space-x-6">
        <div className="grid grid-cols-1 gap-2 ">
            {images1.map((item, index) => (
            <div key={index} className="relative w-[260px] h-[260px]">
                <Image 
                src={item} 
                alt={`flower-image-${index}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 260px" // Add appropriate sizes here
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                />
            </div>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-6 my-[-130px]">
            {images2.map((item, index) => (
            <div key={index} className="relative w-[260px] h-[260px]">
                <Image 
                src={item} 
                alt={`flower-image-${index}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 260px" // Add appropriate sizes here
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
