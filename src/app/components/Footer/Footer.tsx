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
            <div className="container mx-auto pt-20 pb-4">
                <div className="flex space-x-10 bg-lightGreen w-full p-8 rounded-2xl">
                    <div className="flex flex-col w-1/2">
                        <p className="text-3xl text-secondary font-medium mb-4">{t('title')}</p>
                        <p>{t('subtitle')}</p>
                    </div>
                    <div className="flex items-center justify-end w-1/2">
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
                <div className="flex justify-between mt-16 pt-16 border-t border-tertiary">
                    <div className="flex w-1/4 flex-col">
                        <Link href="/" legacyBehavior>
                            <Image className='cursor-pointer' src={'/logo-white.svg'} alt="logo" width={180} height={24} />
                        </Link>
                        <p className="text-white my-6">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <Link href="mailto:info@greendaysinvest.com">
                            <p className="text-white mb-1">info@greendaysinvest.com</p>
                        </Link>
                        <Link href="tel:+49 163 7343363">
                            <p className="text-white">+49 163 7343363</p>
                        </Link>
                    </div>
                    <div className="flex gap-10 space-x-40">
                        <div className="flex flex-col">
                            <Link href="/" legacyBehavior>
                                <p className="text-tertiary font-bold text-xl mb-6">About us</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Mission</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Our team</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Testimonials</p>
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <Link href="/" legacyBehavior>
                                <p className="text-tertiary font-bold text-xl mb-6">Services</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Web design</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Web development</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Mobile design</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">UI/UX design</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Branding design</p>
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <Link href="/" legacyBehavior>
                                <p className="text-tertiary font-bold text-xl mb-6">Contact us</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Information</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Request a quote</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Consultation</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Help center</p>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <p className="text-white mb-3">Terms and conditions</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center border-t border-white pt-4 mt-16">
                    <p className="text-white">Copyright © 2025 Green Day Invest | All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
