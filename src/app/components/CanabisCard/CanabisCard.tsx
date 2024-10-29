import Image, { StaticImageData } from "next/image"
import { LuFlower2 } from "react-icons/lu"
import Button from "../Button/Button"

interface Props {
    image: StaticImageData
    title: string,
    type: string,
    price: string
    isBorder?: boolean
}

const CanabisCard:React.FC<Props> = ({ image, title, type, price, isBorder }) => {
    return (
        <div className={`rounded-2xl bg-white p-6 ${isBorder ? 'border border-1 border-main' : ''}`}>
            <div className="flex space-x-8">
                <Image
                    src={image}
                    alt={`${image}-canabis`}
                    width={150}
                    height={150}
                    className="object-cover rounded-md"
                />
                <div className="flex flex-col">
                    <div className="flex space-x-3">
                        <span className="bg-tertiary p-3 flex items-center justify-center rounded-md">
                            <LuFlower2 className="text-main" />
                        </span>
                        <span className="bg-tertiary p-3 flex items-center justify-center rounded-md">
                            <LuFlower2 className="text-main" />
                        </span>
                        <span className="bg-tertiary p-3 flex items-center justify-center rounded-md">
                            <LuFlower2 className="text-main" />
                        </span>
                    </div>
                    <div className="border border-1 border-tertiary rounded-md p-2 flex justify-between my-4">
                        <p className="text-main text-xs text-center">THC</p>
                        <p className="text-main text-xs text-center">18%</p>
                        <p className="text-main text-xs text-center">-18%</p>
                    </div>
                    <div className="border border-1 border-tertiary rounded-md p-2 flex justify-between">
                        <p className="text-main text-xs">THC</p>
                        <p className="text-main text-xs">18%</p>
                        <p className="text-main text-xs">-18%</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-secondary text-2xl font-medium mt-6 mb-3">{title}</p>
                <p className="text-secondary mb-8">{type}</p>
                <div className="flex justify-between items-center">
                    <p className="text-lightGreen text-2xl">ab <span className="text-secondary text-3xl">{price} €</span> gr</p>
                    <Button variant="dark" label="See More" onClick={() => console.log("here")} />
                </div>
            </div>
        </div>
    )
}

export default CanabisCard