import NextImage from "next/image";
import { LuFlower2 } from "react-icons/lu";
import Button from "../Button/Button";
import { Flower } from "@/app/types/Flower.type";
import { FaSun } from "react-icons/fa";
import { MdOutlineLight } from "react-icons/md";

interface Props {
  item: Flower;
  isBorder?: boolean;
}

const CanabisCard: React.FC<Props> = ({
  item: { image: itemImage, name, genetic, price, thc, cbd, link },
  isBorder,
}) => {
  return (
    <div className={`rounded-2xl bg-white p-5 lg:p-6 ${isBorder ? 'border border-1 border-main' : ''}`}>
      <div className="flex space-x-4 lg:space-x-8">
        <NextImage
          src={itemImage}
          alt={`${name}-cannabis`}
          width={200} 
          height={200} 
          className="object-cover rounded-md w-[200px] h-[200px] md:w-[150px] md:h-[150px]" // Use lg: to override for large screens
        />
        <div className="flex flex-col">
          <div className="flex space-x-3">
            <span className="bg-tertiary p-3 flex items-center justify-center rounded-md">
                <LuFlower2 className="text-main" />
            </span>
            <span className="bg-tertiary p-3 flex items-center justify-center rounded-md">
                <FaSun className="text-main" />
            </span>
            <span className="bg-tertiary p-3 flex items-center justify-center rounded-md">
                <MdOutlineLight className="text-main" />
            </span>
          </div>
          <div className="border border-1 border-tertiary rounded-md p-2 flex justify-evenly my-4">
            <p className="text-main text-xs text-center">THC</p>
            <p className="text-main text-xs text-center">{thc}%</p>
          </div>
          <div className="border border-1 border-tertiary rounded-md p-2 flex justify-evenly">
            <p className="text-main text-xs">CBD</p>
            <p className="text-main text-xs">{cbd}%</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[200px]">
        <div>
            <p className="text-secondary text-xl lg:text-2xl font-medium mt-6 mb-3">{name}</p>
            <p className="text-secondary  mb-8">{genetic}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lightGreen text-xl lg:text-2xl">
            ab <span className="text-secondary text-lg lg:text-3xl">{price}</span> gr
          </p>
          <Button
            variant="dark"
            label="See More"
            onClick={() => window.open(link, "_blank")} // Opens link in a new tab
          />
        </div>
      </div>
    </div>
  );
};

export default CanabisCard;
