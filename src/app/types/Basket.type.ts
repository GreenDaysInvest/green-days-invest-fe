import { Dispatch, SetStateAction } from "react";
import { Basket, Flower } from "./Flower.type";

export interface BasketContextType {
    pricePerService: string;
    basket: Basket[];
    setBasket: Dispatch<SetStateAction<Basket[]>>,
    addToBasket: (item: Flower) =>  void;
    removeFromBasket: (id: string) =>  void;
    updateItemQuantity: (itemId: string, quantity: number) =>  void;
    clearBasket: () =>  void;
}