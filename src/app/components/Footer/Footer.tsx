"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const Footer = () => {

    const [email, setEmail] = useState('');

    const t = useTranslations('Footer');
    return (
        <div className="bg-darkGreen">
            <div className="container mx-auto pt-14 lg:pt-20 pb-8 sm:pb-4 px-4 md:px-8 lg:px-4">
                <div className="flex flex-col lg:flex-row lg:space-x-10 bg-lightGreen w-full p-8 rounded-2xl hidden lg:flex">
                    <div className="flex flex-col w-full lg:w-1/2 mb-6 lg:mb-0">
                        <p className="text-3xl text-secondary font-medium mb-4 lg:text-left md:text-center text-center">{t('title')}</p>
                        <p className="lg:text-left md:text-center text-center">{t('subtitle')}</p>
                    </div>
                    <div className="flex items-center justify-center lg:justify-end w-full lg:w-1/2">
                        <div className="flex w-full max-w-[400px] border-darkGreen rounded-lg overflow-hidden">
                            <input
                                type="email"
                                placeholder={t('email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 w-full focus:outline-none"
                            />
                            <button className="bg-secondary text-lightGreen px-6 py-2">
                                {t('submit')}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:mt-16 lg:pt-16 lg:border-t lg:border-tertiary">
                    <div className="flex w-full lg:w-1/4 flex-col mb-10 lg:mb-0">
                        <Link href="/" >
                            <Image 
                                className='cursor-pointer mx-auto lg:mx-0' 
                                src={'/logo-white.svg'} 
                                alt="logo" 
                                width={200} 
                                height={24}
                                sizes="(max-width: 600px) 100vw, 180px" 
                            />
                        </Link>
                        <Link href="mailto:info@greendaysinvest.com">
                            <p className="text-white mt-8 mb-3 lg:text-left md:text-center text-center">info@greendaysinvest.com</p>
                        </Link>
                        <Link href="tel:+49 163 7343363">
                            <p className="text-white lg:text-left md:text-center text-center">+49 163 7343363</p>
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 lg:gap-10 space-x-0 md:space-x-8 lg:space-x-20 sm:justify-between items-center sm:items-start">
                        <div className="flex flex-col items-center sm:items-start">
                            <Link href="/" >
                                <p className="text-tertiary font-bold text-xl mb-6">About us</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Mission</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Our team</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Testimonials</p>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <Link href="/" >
                                <p className="text-tertiary font-bold text-xl mb-6">Services</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Web design</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Web development</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Mobile design</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">UI/UX design</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Branding design</p>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <Link href="/" >
                                <p className="text-tertiary font-bold text-xl mb-6">Contact us</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Information</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Request a quote</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Consultation</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Help center</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">Terms and conditions</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center border-t border-white pt-4 mt-6 lg:mt-14">
                    <p className="text-white text-center">Copyright © 2025 Green Day Invest | All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
