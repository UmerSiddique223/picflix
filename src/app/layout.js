import { Inter } from "next/font/google";
import "./globals.css";
import Leftbar from "../components/layout/Leftbar";
import BottomBar from "../components/layout/BottomBar";
import { cn } from "../lib/utils";
import Topbar from "../components/layout/Topbar";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "Picflix",
    description: "A fun social media platform for sharing photos and videos.",
};

export default function RootLayout({ children }) {
    
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen dark bg-background font-sans antialiased",
                    inter.className
                )}
            >
                <div className="w-full md:flex items-start">
                    <Topbar />
                    <Leftbar />
                    <section className="min-h-screen">{children}</section>
                    <BottomBar />
                </div>
            </body>
        </html>
    );
}
