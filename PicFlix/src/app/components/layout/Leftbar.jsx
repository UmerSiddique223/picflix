"use client"
import Link from "next/link";
import Image from "next/image";
import getSvgs, { sidebarLinks } from "@/app/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/UI/button";

const Leftbar = () => {
    const pathname = useRouter();
    return (
        <nav className="hidden relative md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-bar">
            <div className="flex flex-col gap-11">
                <Link
                    href="/"
                    className="flex gap-3 items-center text-gradient text-4xl"
                >
                    PicFLix
                </Link>
                <div className="flex gap-3 items-center">
                    <Image
                        src="/assets/hq720.jpg"
                        alt="img"
                        className="w-14 h-14 rounded-full"
                        width={56}
                        height={56}
                    />
                    <div className="flex flex-col">
                        <p className="text-[18px] font-bold leading-[140%]">
                            Butt Sahb
                        </p>
                        <p className="text-[#c0e5eb] text-[14px] font-normal leading-[140%]">
                            @butt.sheracom
                        </p>
                    </div>
                </div>
                <ul className=" flex flex-col gap-6">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route;
                        return (
                            <li
                                key={link.label}
                                className={`rounded-xl group text-[16px] font-medium leading-[140%] hover:bg-prim_Col transition ${
                                    isActive && "bg-prim_Col"
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
                className="shad-button_ghost flex justify-start gap-1"
            >
                <Image
                    src="/assets/logout-svgrepo-com.svg"
                    className="w-6 h-6 "
                    alt="logout"
                    width={24}
                    height={24}
                />
                <p className="lg:text-[17px] text-[15px] font-medium leading-[140%]">
                    Logout
                </p>
            </Button>
        </nav>
    );
};

export default Leftbar;
