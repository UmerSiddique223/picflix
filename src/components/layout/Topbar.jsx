"use client";
import { Button } from "../UI/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Topbar = ({ user }) => {
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
    <section className="sticky top-0 z-50 lg:hidden bg-bar w-full">
      <div className="flex justify-between items-center py-4 px-5">
        <Link
          href="/"
          className="flex text-5xl ml-3 gap-3 items-center text-primary "
        >
          Y?
        </Link>
        <div className="flex gap-4">
          <Link
            href={`/profile/${user.user_id}`}
            className="flex justify-center items-center"
          >
            {user.profile_picture ? (
              <Image
                src={`/images/${user.profile_picture}`}
                alt="profile picture"
                className="w-10 h-10 rounded-full"
                width={44}
                height={44}
              />
            ) : (
              <Image
                src="/images/default-photo.png"
                alt="profile picture"
                className="w-10 h-10 rounded-full"
                width={44}
                height={44}
              />
            )}
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
