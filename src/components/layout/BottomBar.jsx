"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import getSvgs, { bottombarLinks } from "../../lib/constants";
const BottomBar = () => {
    const pathname = usePathname();
    return (
        <section className="z-10 flex justify-around w-full sticky bottom-0 bg-[#09090A] px-5 py-4 md:hidden">
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <Link
                        key={link.label}
                        href={link.route}
                        className={`flex justify-center items-center flex-col gap-y-1 ${
                            isActive &&
                            "bg-prim_Col rounded-[10px] gap-1 p-2 transition"
                        }`}
                    >
                        <Image
                            src={getSvgs(link.name)}
                            width={20}
                            height={20}
                            alt={link.label}
                            className={`w-5 h-5 ${
                                isActive && "invert brightness-0"
                            }`}
                        />
                        <p className="text-[10px] text-[#EFEFEF] font-medium">
                            {link.label}
                        </p>
                    </Link>
                );
            })}
        </section>
    );
};

export default BottomBar;
