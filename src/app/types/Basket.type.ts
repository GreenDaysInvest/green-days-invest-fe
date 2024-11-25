import { Basket, Flower } from "./Flower.type";

export interface BasketContextType {
    basket: Basket[];
    addToBasket: (item: Flower) =>  void;
    removeFromBasket: (id: string) =>  void;
    updateItemQuantity: (itemId: string, quantity: number) =>  void;
}