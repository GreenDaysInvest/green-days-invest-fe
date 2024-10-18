import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css";
import "../globals.scss";
import Navbar from "../components/Navbar/Navbar";
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "../components/Footer/Footer";

const inter = Inter({
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Green Days Invest",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = await getMessages();
 
  return (
    <html lang="de">
      <body
        className={` ${inter.variable} bg-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
