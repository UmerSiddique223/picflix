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
} from "@/components/ui/dropdown-menu";

const Leftbar = () => {
  const pathname = usePathname();
  return (
    <nav className="sticky hidden top-0 h-screen md:flex flex-col min-w-[270px] bg-bar">
      <div className="h-full flex flex-col justify-between px-6 py-10 gap-y-8 custom-scrollbar overflow-y-scroll">
        <div className="flex flex-col gap-10">
          <Link
            href="/"
            className="flex gap-3 items-center text-primary text-4xl"
          >
            PicFLix
          </Link>
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
                  <Link
                    href={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    <Image
                      src={getSvgs(link.name)}
                      alt={link.label}
                      className={`group-hover:brightness-0 group-hover:invert ${
                        isActive && "invert brightness-0"
                      }`}
                      width={24}
                      height={24}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          variant="ghost"
          className="flex gap-4 items-center justify-start"
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
