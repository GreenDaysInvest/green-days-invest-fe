import { StaticImageData } from "next/image";

export interface Slide {
    id: number;
    text: React.ReactNode;
    image: StaticImageData;
    textOnLeft: boolean;
};