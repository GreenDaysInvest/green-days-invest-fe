"use client";
import { usePathname } from "@/i18n/routing";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const showHeaderFooter = !pathname.startsWith('/dashboard');
    return (
        <>
            {showHeaderFooter && <Navbar />}
            {children}
            {showHeaderFooter && <Footer />}
        </>
    )
}

export default Layout;