import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import UserProvider from "@/lib/context/UserContext";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Sign In",
  description:
    "Become a new member or give Credentials if you are already a member.",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen dark font-sans antialiased",
            inter.className
          )}
        >
          <div className="w-full">
            <section className="min-h-screen">{children}</section>
          </div>
        </body>
      </html>
    </UserProvider>
  );
}
