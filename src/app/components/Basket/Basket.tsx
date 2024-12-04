"use client";
import { useBasket } from "@/app/context/BasketContext";
import { showInfoToast } from "@/app/utils/toast";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "../Button/Button";
import { useApp } from "@/app/context/AppContext";
import { useAuth } from "@/app/context/AuthContext";

const Basket = () => {

  const { user } = useAuth();
  const { setActiveTab } = useApp();
  const { pricePerService, basket, removeFromBasket, updateItemQuantity } = useBasket();
  const t = useTranslations('Dashboard');

  const handleIncrement = (item: any) => {
    updateItemQuantity(item.flower.id, 1);
  };

  const handleDecrement = (item: any) => {
    if (item.quantity > 1) {
      updateItemQuantity(item.flower.id, -1);
    } else {
      handleRemove(item.flower.id);
    }
  };

  const handleRemove = (itemId: string) => {
    removeFromBasket(itemId);
    showInfoToast(t("removedFromBasket"));
  };
  
  const handleCheckout = () => {
    console.log(user);
    if (user?.isVerified) {
      setActiveTab('checkout');
    } else {
      setActiveTab('verificationForm');
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-0 lg:p-6">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-10">{t("Sidebar.basket")}</h2>
      {Array.isArray(basket) && basket.length > 0 ? (
        <>
          <div className="h-[450px] overflow-auto">
            {basket.map((item) => (
              <div
                key={item.flower.id}
                className="border border-secondary rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
              >
                <div className="flex flex-row items-center">
                  <Link href={item.flower.link}>
                    <Image
                      src={item.flower.image}
                      alt={item.flower.image}
                      width={130}
                      height={130}
                      className="rounded-md min-w-[130px] mx-auto sm:mx-0"
                    />
                  </Link>
                  <p className="ml-4 text-secondary text-left">{item.flower.name}</p>
                </div>
                <div className="flex flex-row justify-between items-center mt-4 sm:mt-0">
                  <div className="flex items-center justify-center mb-2 sm:mb-0">
                    <button
                      className="text-main text-sm p-2 sm:p-4"
                      onClick={() => handleDecrement(item)}
                    >
                      <AiOutlineMinus />
                    </button>
                    <p className="border rounded-md p-2 text-secondary mx-2">{item.quantity}</p>
                    <button
                      className="text-main text-sm p-2 sm:p-4"
                      onClick={() => handleIncrement(item)}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <p className="text-secondary text-center sm:text-left sm:mr-8 mx-8">{item.flower.price}/1gr</p>
                  <button
                    onClick={() => handleRemove(String(item.flower.id))}
                  >
                    <MdDeleteForever className="text-main text-4xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-secondary text-right flex flex-col items-end space-y-4">
            <h3 className="text-xl font-semibold text-secondary">{t("total")}: {pricePerService}€</h3>
            <Button className="px-6 w-full sm:w-auto" label={t("proceedToCheckout")} variant="secondary" onClick={handleCheckout}/>
          </div>
        </>
      ) : (
        <p className="text-center text-secondary">{t("emptyBasket")}</p>
      )}
    </div>
  );
};

export default Basket;
