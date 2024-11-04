import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css";
import "../globals.scss";
import Navbar from "../components/Navbar/Navbar";
import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "../components/Footer/Footer";
import { AuthProvider } from "../context/AuthContext";
import { AppProvider } from "../context/AppContext";
import { ScraperDataProvider } from "../context/ScraperDataContext";
import { usePathname } from 'next/navigation';
import Layout from "../components/Layout/Layout";

const poppins = Poppins({
  subsets: ['latin'], 
  variable: '--font-poppins',
  display: 'swap', 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Green Days Invest",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
      <body
        className={`${poppins.variable} bg-white antialiased`}
      >
        <AuthProvider>
          <AppProvider>
            <ScraperDataProvider>
              <NextIntlClientProvider messages={messages}>
                <Layout children={children}/>
              </NextIntlClientProvider>
            </ScraperDataProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
