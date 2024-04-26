import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import UserProvider from "@/lib/context/UserContext";
import { ThemeProvider } from "@/utils/theme-provider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Sign In",
  description:
    "Become a new member or give Credentials if you are already a member.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen  font-sans antialiased", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full">
            <section className="min-h-screen">{children}</section>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
