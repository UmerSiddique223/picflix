"use client";
import Link from "next/link";
import Image from "next/image";
import getSvgs, { sidebarLinks } from "../../lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../UI/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { getUser } from "@/lib/userInfo";
import { useEffect, useState } from "react";

const Leftbar = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const [user, setUser] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") setUser(getUser());
  }, []);

  const router = useRouter();
  const HandleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <nav className="sticky hidden top-0 h-screen lg:flex flex-col min-w-[270px] bg-bar">
      <div className="h-full flex flex-col justify-between px-6 py-10 gap-y-8 custom-scrollbar overflow-y-scroll">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex gap-3 items-center text-primary text-4xl"
            >
              PicFLix
            </Link>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Image
              src="/images/hq720.jpg"
              alt="img"
              className="w-14 h-14 rounded-full"
              width={56}
              height={56}
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold">Butt Sahb</p>
              <p className="text-sm font-normal">@butt.sheracom</p>
            </div>
          </div>
          <ul className=" flex flex-col gap-4">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.route;
              return (
                <li
                  key={link.label}
                  className={`rounded-xl group text-base font-medium hover:bg-primary transition ${
                    isActive && "bg-primary"
                  }`}
                >
                  {link.route === "/profile" ? (
                    <Link
                      href={`${link.route}/${user.user_id}`}
                      className="flex gap-4 items-center p-4"
                    >
                      {" "}
                      <Image
                        src={getSvgs(link.name)}
                        alt={link.label}
                        className={`group-hover:brightness-0 h-6 w-6 group-hover:invert ${
                          isActive && "invert brightness-0"
                        }`}
                        width={24}
                        height={24}
                      />
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      href={link.route}
                      className="flex gap-4 items-center p-4"
                    >
                      {" "}
                      <Image
                        src={getSvgs(link.name)}
                        alt={link.label}
                        className={`group-hover:brightness-0  h-6 w-6 group-hover:invert ${
                          isActive && "invert brightness-0"
                        }`}
                        width={24}
                        height={24}
                      />
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          variant="ghost"
          className="flex gap-4 items-center justify-start"
          onClick={HandleLogout}
        >
          <Image
            src="/icons/logout.svg"
            className="w-6 h-6"
            alt="logout"
            width={24}
            height={24}
          />
          <p className="lg:text-base text-sm font-medium">Logout</p>
        </Button>
      </div>
    </nav>
  );
};

export default Leftbar;
