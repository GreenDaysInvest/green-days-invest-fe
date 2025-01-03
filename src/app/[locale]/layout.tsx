import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css";
import "../globals.scss";
import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "../context/AuthContext";
import { AppProvider } from "../context/AppContext";
import { ScraperDataProvider } from "../context/ScraperDataContext";
import Layout from "../components/Layout/Layout";
import ToastProvider from "../components/ToastProvider/ToastProvider";
import { BasketProvider } from "../context/BasketContext";

const poppins = Poppins({
  subsets: ['latin'], 
  variable: '--font-poppins',
  display: 'swap', 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Cannabis Rezepte 24",
  description: "Einfach, schnell und zuverlässig: Mit unserem Service erhältst du dein Cannabis-Rezept bequem von zu Hause aus", keywords: ['cannabis-rezept', 'cannabis rezept', 'cannabisrezepte', 'cannabisrezepte24', 'cannabis', 'green days invest', 'greendaysinvest'],
  authors: [{ name: 'cannabisrezepte24' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Cannabis Rezepte 24',
    description: 'Einfach, schnell und zuverlässig: Mit unserem Service erhältst du dein Cannabis-Rezept bequem von zu Hause aus',
    url: 'https://www.mywebsite.com',
    siteName: 'Cannabis Rezepte 24',
    images: [
      {
        url: 'https://www.mywebsite.com/image.jpg',
        width: 800,
        height: 600,
        alt: 'Cannabis Rezepte 24 Image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cannabis Rezepte 24',
    description: 'Einfach, schnell und zuverlässig: Mit unserem Service erhältst du dein Cannabis-Rezept bequem von zu Hause aus',
    images: ['https://www.mywebsite.com/image.jpg'],
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang="de">
      <head>
        <meta name="trustpilot-one-time-domain-verification-id" content="1c53e06d-5503-4417-830f-ade30c79ddb3"/>
      </head>
      <body
        className={`${poppins.variable} bg-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <AppProvider>
              <BasketProvider>
                <ScraperDataProvider>
                    <ToastProvider>
                      <Layout children={children}/>
                    </ToastProvider>
                </ScraperDataProvider>
              </BasketProvider>
            </AppProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
