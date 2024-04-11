import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import getSvgs, { bottombarLinks } from "@/app/lib/constants";
const BottomBar = () => {
    const pathname = usePathname();
    return (
        <section className="z-50 flex justify-around w-full sticky bottom-0 rounded-t-[20px] bg-[#09090A] px-5 py-4 md:hidden top-8">
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route;
                console.log(isActive, pathname, link.route);
                return (
                    <Link
                        key={link.label}
                        href={link.route}
                        className={`flex justify-center items-center flex-col ${
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
                        <p className="text-[10px] text-[#EFEFEF] font-medium leading-[140%]">
                            {link.label}
                        </p>
                    </Link>
                );
            })}
        </section>
    );
};

export default BottomBar;
