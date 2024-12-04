import React from "react";
import NextImage from "next/image";
import { LuFlower2 } from "react-icons/lu";
import Button from "../Button/Button";
import { Flower } from "@/app/types/Flower.type";
import { FaCartPlus, FaSun } from "react-icons/fa";
import { MdOutlineLight } from "react-icons/md";
import { useAuth } from "@/app/context/AuthContext";
import { useBasket } from "@/app/context/BasketContext";
import { useTranslations } from "next-intl";
import { showInfoToast } from "@/app/utils/toast";

interface Props {
  item: Flower;
  isBorder?: boolean;
}

const CanabisCard: React.FC<Props> = ({ item, isBorder }) => {
  const { user } = useAuth();
  const { basket, addToBasket } = useBasket();
  const t = useTranslations("Dashboard");

  const handleAddToBasket = () => {
    const exists = basket?.some((basketItem) => basketItem.id === item.id);

    if (exists) {
      showInfoToast(t("itemExistsInBasket"));
    } else {
      addToBasket(item);
    }
  };

  return (
    <div className={`rounded-2xl bg-white p-5 lg:p-6 ${isBorder ? "border border-1 border-main" : ""}`}>
      <div className="flex space-x-4 lg:space-x-8">
        <NextImage
          src={item.image}
          alt={`${item.name}-cannabis`}
          width={200}
          height={200}
          className="object-cover rounded-md w-[130px] h-[130px] sm:w-[180px] sm:h-[180px] md:w-[140px] md:h-[140px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px]"
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
            <p className="text-main text-xs text-center">{item.thc}%</p>
          </div>
          <div className="border border-1 border-tertiary rounded-md p-2 flex justify-evenly">
            <p className="text-main text-xs">CBD</p>
            <p className="text-main text-xs">{item.cbd}%</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[180px] md:h-[200px]">
        <div>
          <p className="text-secondary text-xl lg:text-2xl font-medium mt-6 mb-3">{item.name}</p>
          <p className="text-secondary mb-4 md:mb-8">{item.genetic}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lightGreen text-lg lg:text-xl">
            ab <span className="text-secondary text-lg lg:text-2xl">{item.price}</span> gr
          </p>
          <div className="flex items-center">
            {((user && !user?.isAdmin) && user.questionnaires && user.questionnaires?.length > 0 && user?.questionnaires[user.questionnaires.length - 1]?.status === "accepted")  && (
              <button className="p-4 me-4" onClick={handleAddToBasket}>
                <FaCartPlus className="text-secondary text-2xl" />
              </button>
            )}
            <Button variant="dark" label="See More" onClick={() => window.open(item.link, "_blank")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanabisCard;
