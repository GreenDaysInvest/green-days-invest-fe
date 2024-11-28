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

const Basket = () => {

  const { setActiveTab } = useApp();
  const { basket, removeFromBasket, updateItemQuantity } = useBasket();
  const t = useTranslations('Dashboard');

  const calculateTotal = () => {
    return basket
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.flower.price.replace(/[^\d,]/g, '').replace(',', '.'));
        return total + itemPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

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
    setActiveTab('verificationForm');
    // setActiveTab('checkout');
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-10">{t("Sidebar.basket")}</h2>
      {Array.isArray(basket) && basket.length > 0 ? (
        <>
          <div className="h-[550px] overflow-auto">
            {basket.map((item) => (
              <div
                key={item.flower.id}
                className="border border-secondary rounded-md p-4 flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <Link href={item.flower.link}>
                    <Image
                      src={item.flower.image}
                      alt={item.flower.image}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </Link>
                  <p className="ml-4 text-secondary">{item.flower.name}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-main text-sm p-4"
                    onClick={() => handleDecrement(item)}
                  >
                    <AiOutlineMinus />
                  </button>
                  <p className="border rounded-md p-2 text-secondary mx-2">{item.quantity}</p>
                  <button
                    className="text-main text-sm p-4 mr-8"
                    onClick={() => handleIncrement(item)}
                  >
                    <AiOutlinePlus />
                  </button>
                  <p className="text-secondary mr-8">{item.flower.price}/1gr</p>
                  <button onClick={() => handleRemove(String(item.flower.id))}>
                    <MdDeleteForever className="text-main text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 border-t border-secondary text-right">
            <h3 className="text-xl font-semibold text-secondary">{t("total")}: {calculateTotal()}€</h3>
            <Button label={t("proceedToCheckout")} variant="secondary" onClick={handleCheckout}/>
          </div>
        </>
      ) : (
        <p className="text-center text-secondary">{t("emptyBasket")}</p>
      )}
    </div>
  );
};

export default Basket;
