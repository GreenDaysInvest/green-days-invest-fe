
export interface Flower {
    id?: string;
    image: string;
    name: string;
    link: string;
    genetic: string;
    thc: string;
    cbd: string;
    availability: string;
    price: string;
}

export interface Basket {
    id?: string;
    flower: Flower;
    quantity: number;
}