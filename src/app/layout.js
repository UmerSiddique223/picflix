import { Inter } from "next/font/google";

import "./globals.css";
import Topbar from "./components/layout/Topbar";
import Leftbar from "./components/layout/Leftbar";
import BottomBar from "./components/layout/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Picflix",
    description: "A fun social media platform for sharing photos and videos.",
};

export default function RootLayout({ children }) {
    
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="w-full md:flex ">
                    <Topbar />
                    <Leftbar />
                    <section className="flex flex-1 h-full">
                        {children}
                    </section>
                    <BottomBar />
                </div>
            </body>
        </html>
    );
}
