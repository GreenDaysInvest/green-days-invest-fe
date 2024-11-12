import { Client } from "./Client.type";

export interface Testimonial {
    rating: number,
    description: string,
    client: Client;
}