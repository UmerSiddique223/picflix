import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
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
        className={cn(
          "min-h-screen custom-scrollbar font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
