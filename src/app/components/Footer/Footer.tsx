"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {

    const t = useTranslations('Navbar');
    const tDiseasses = useTranslations('HomePage');
    return (
        <div className="bg-darkGreen">
            <div className="container mx-auto pt-14 lg:pt-20 pb-8 sm:pb-4 px-4 md:px-8 lg:px-4">
                <div className="flex flex-col lg:flex-row justify-between">
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
                                <p className="text-tertiary font-bold text-xl mb-6">{t('home')}</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">{t('howItWorks')}</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">{t('cannabisAvailability')}</p>
                            </Link>
                            <Link href="/" >
                                <p className="text-white mb-3">{t('blog')}</p>
                            </Link>
                            <Link href="/faq" >
                                <p className="text-white mb-3">{t('faq')}</p>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <Link href="/" >
                                <p className="text-tertiary font-bold text-xl mb-6">{t('diseases')}</p>
                            </Link>
                            <Link href="/disease/sleep-disorder" >
                                <p className="text-white mb-3">{tDiseasses('Disease.list.sleepDisorder')}</p>
                            </Link>
                            <Link href="/disease/migrane" >
                                <p className="text-white mb-3">{tDiseasses('Disease.list.migraine')}</p>
                            </Link>
                            <Link href="/disease/chronic-pain" >
                                <p className="text-white mb-3">{tDiseasses('Disease.list.chronicPain')}</p>
                            </Link>
                            <Link href="/disease/adhd" >
                                <p className="text-white mb-3">{tDiseasses('Disease.list.adhd')}</p>
                            </Link>
                            <Link href="/disease/depression" >
                                <p className="text-white mb-3">{tDiseasses('Disease.list.depresion')}</p>
                            </Link>
                            {/* <Link href="/" >
                                <p className="text-white mb-3">{tDiseasses('Disease.list.furtherComplaints')}</p>
                            </Link> */}
                        </div>
                        <div className="flex flex-col items-center sm:items-start w-[150px]">
                            <Link href="/" >
                                <p className="text-tertiary font-bold text-xl mb-6">{t('termsPrivacy')}</p>
                            </Link>
                            <Link href="/privacy-policy" >
                                <p className="text-white mb-3">{t('dataPrivacy')}</p>
                            </Link>
                            <Link href="/terms-and-conditions" >
                                <p className="text-white break-words mb-3 w-[150px]">{t('termsConditions')}</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center border-t border-white pt-4 mt-6 lg:mt-14">
                    <p className="text-white text-center">Copyright © 2025 Green Day Invest | {t('allRightsReserved')}</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
