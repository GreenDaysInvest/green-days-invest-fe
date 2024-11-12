import { StaticImageData } from "next/image";

export interface Client {
    name: string;
    avatar: StaticImageData | string;
    position: string;
}