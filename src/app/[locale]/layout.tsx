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
  title: "Cannabisrezepte24 – Medizinische Cannabis-Rezepte online",
  description: "Ihre Plattform für medizinisches Cannabis. Schnell und einfach zum Rezept: Individuelle Beratung, flexible Auswahl der Cannabisblüten und direkte Rezeptübermittlung an Apotheken.", 
  keywords: ['Cannabis Rezept online', 'Medizinisches Cannabis Therapie', 'THC-Rezept beantragen', 'ADHS mit Cannabis behandeln', 'Chronische Schmerzen lindern mit THC', 'Medizinische Cannabisblüten auswählen', 'Digitale Rezeptplattform für THC', 'Cannabis bei Schlafstörungen', 'THC gegen Migräne', 'Rezept für medizinisches Cannabis Deutschland', 'THC-Therapie einfach beantragen', 'Kostenübernahme Krankenkasse Cannabis', 'Schnelle Rezeptabwicklung für Cannabis', 'Medizinisches THC bei Depressionen', 'Diskrete THC-Rezepte online'],
  authors: [{ name: 'Cannabisrezepte24' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Cannabisrezepte24 – Medizinische Cannabis-Rezepte online',
    description: 'Ihre Plattform für medizinisches Cannabis. Schnell und einfach zum Rezept: Individuelle Beratung, flexible Auswahl der Cannabisblüten und direkte Rezeptübermittlung an Apotheken.',
    url: 'https://www.cannabisrezepte24.de',
    siteName: 'Cannabisrezepte24 – Medizinische Cannabis-Rezepte online',
    images: [
      {
        url: 'https://www.cannabisrezepte24.de/_next/image?url=%2Fflower.png&w=384&q=75',
        width: 800,
        height: 600,
        alt: 'Cannabis Rezepte 24 Image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cannabisrezepte24 – Medizinische Cannabis-Rezepte online',
    description: 'Ihre Plattform für medizinisches Cannabis. Schnell und einfach zum Rezept: Individuelle Beratung, flexible Auswahl der Cannabisblüten und direkte Rezeptübermittlung an Apotheken.',
    images: ['https://www.cannabisrezepte24.de/_next/image?url=%2Fflower.png&w=384&q=75'],
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
        <meta name="robots" content="index, follow"/>
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
