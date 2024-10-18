import { Link } from "@/i18n/routing";
import Image from "next/image";



const Footer = () => {
    return (
        <div className="bg-darkGreen">
            <div className="container mx-auto py-20 flex justify-between">
                <div className="flex w-1/4 flex-col">
                    <Link href="/" legacyBehavior>
                        <Image src={'/logo.webp'} alt="logo" width={180} height={24} />
                    </Link>
                    <p className="text-white my-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <Link href="mailto:info@greendaysinvest.com"><p className="text-white mb-1">info@greendaysinvest.com</p></Link>
                    <Link href="tel:+49 163 7343363"><p className="text-white">+49 163 7343363</p></Link>
                </div>
                <div className="flex gap-10 mt-[50px]">
                    <div className="flex flex-col">
                        <Link href="/" legacyBehavior className="text-white font-2xl">Home</Link>
                        <Link href="/" legacyBehavior>Home</Link>
                        <Link href="/" legacyBehavior>Home</Link>
                        <Link href="/" legacyBehavior>Home</Link>
                    </div>
                    <div className="flex flex-col">
                        <Link href="/" legacyBehavior>Home</Link>
                        <Link href="/" legacyBehavior>Home</Link>
                        <Link href="/" legacyBehavior>Home</Link>
                        <Link href="/" legacyBehavior>Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Footer;