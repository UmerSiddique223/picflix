"use client";
import Link from "next/link";
import Image from "next/image";
import getSvgs, { sidebarLinks } from "../../lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../UI/button";

const Leftbar = ({ user }) => {
  const pathname = usePathname();
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
    <nav className="sticky hidden top-0 h-screen text-white lg:flex flex-col min-w-[270px] bg-bar">
      <div className="h-full flex flex-col justify-between px-6 py-3 gap-y-8 custom-scrollbar overflow-y-scroll">
        <div className="flex flex-col gap-8">
          <div className="flex text-7xl justify-between items-center">
            <Link
              href="/"
              className="flex gap-3 ml-3 items-center text-primary"
            >
              Y?
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            {user.profile_picture ? (
              <Image
                src={`/images/${user.profile_picture}`}
                alt="img"
                className="w-14 h-14 rounded-full"
                width={56}
                height={56}
              />
            ) : (
              <Image
                src={"/images/default-photo.png"}
                alt="img"
                className="w-14 h-14 rounded-full"
                width={56}
                height={56}
              />
            )}

            <div className="flex flex-col">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-sm font-normal">@{user.username}</p>
            </div>
          </div>
          <ul className=" flex flex-col gap-4">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.route ||
                (link.route !== "/" && pathname.startsWith(link.route));
              return (
                <li
                  key={link.label}
                  className={`rounded-xl group text-base font-medium hover:bg-primary transition ${
                    isActive && "bg-primary"
                  }`}
                >
                  {link.route === "/profile" && user && (
                    <Link
                      href={`${link.route}/${user.user_id}`}
                      className="flex gap-4 items-center p-4"
                    >
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
                  )}
                  {link.route !== "/profile" && (
                    <Link
                      href={link.route}
                      className="flex gap-4 items-center p-4"
                    >
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
