"use client";
import { Button } from "../UI/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Topbar = () => {
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
    <section className="sticky top-0 z-50 md:hidden bg-bar w-full">
      <div className="flex justify-between items-center py-4 px-5">
        <Link
          href="/"
          className="flex gap-3 items-center text-primary text-3xl"
        >
          PicFLix
        </Link>
        <div className="flex gap-4">
          <Link href="/profile" className="flex justify-center items-center">
            <Image
              src="/images/hq720.jpg"
              alt="profile picture"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
          </Link>
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
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
