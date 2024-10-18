import { Slide } from "./type";
import image1 from '../../../../public/header-image.webp';
import Button from "../Button/Button";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export const slides: Slide[] = [
  {
    id: 1,
    text: (
      <>
        <h1 className="text-[55px] text-black font-bold leading-none">
          <span className="text-main">5 minutes</span> to Become a Cannabis Patient 
        </h1>
        <ul className="list-none mt-20 mb-24 space-y-2">
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> Register quickly and for free</li>
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> Prescription requested in 5 minutes</li>
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> 100% digital & discreet</li>
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> Online Doctors & Pharmacy Service</li>
        </ul>
        <div className="flex space-x-4">
          <Button 
            label="Request treatment"
            type="primary"
            onClick={() => console.log("here")} />
          <Button 
            label="Check live inventory"
            type="outline"
            onClick={() => console.log("here")} />
        </div>
      </>
    ),
    image: image1,
    textOnLeft: true,
  },
  {
    id: 2,
    text: (
      <>
        <h1 className="text-[55px] text-black font-bold leading-none">
          <span className="text-main">5 minutes</span> to Become a Cannabis Patient 
        </h1>
        <ul className="list-none mt-20 mb-24 space-y-2">
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> Register quickly and for free</li>
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> Prescription requested in 5 minutes</li>
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> 100% digital & discreet</li>
          <li className="flex items-center text-black text-xl"><IoCheckmarkDoneCircle className="text-main mr-2" size={30} /> Online Doctors & Pharmacy Service</li>
        </ul>
        <div className="flex space-x-4">
          <Button 
            label="Request treatment"
            type="primary"
            onClick={() => console.log("here")} />
          <Button 
            label="Check live inventory"
            type="secondary"
            onClick={() => console.log("here")} />
        </div>
      </>
    ),
    image: image1,
    textOnLeft: false,
  },
];