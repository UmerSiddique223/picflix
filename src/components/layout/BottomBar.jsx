"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import getSvgs, { bottombarLinks } from "../../lib/constants";

const BottomBar = ({ user }) => {
  const pathname = usePathname();
  return (
    <section className="z-10 flex justify-center w-full sticky bottom-0 bg-[#09090A]  py-4 lg:hidden">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <div key={link.route}>
            {link.route === "/profile" && user && (
              <Link
                href={`${link.route}/${user.user_id}`}
                className="flex gap-4 items-center p-4"
              >
                <Image
                  src={getSvgs(link.name)}
                  alt={link.label}
                  width={24}
                  height={24}
                  className={`group-hover:brightness-0 h-6 w-6 group-hover:invert ${
                    isActive && "invert brightness-0 h-14 w-14"
                  }`}
                />
                {link.label}
              </Link>
            )}
            {link.route !== "/profile" && (
              <Link href={link.route} className="flex gap-4 items-center p-4">
                <Image
                  src={getSvgs(link.name)}
                  alt={link.label}
                  width={24}
                  height={24}
                  className={`group-hover:brightness-0 h-6 w-6 group-hover:invert ${
                    isActive && "invert brightness-0 h-14 w-14"
                  }`}
                />
                {link.label}
              </Link>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default BottomBar;
