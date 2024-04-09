import { Button } from "@/app/components/UI/button";
import Link from "next/link";
import Image from "next/image";
const Topbar = () => {
    return (
        <section className="sticky top-0 z-50 md:hidden bg-bar w-full">
            <div className="flex justify-between items-center py-4 px-5">
                <Link
                    href="/"
                    className="flex gap-3 items-center text-gradient text-3xl"
                >
                    PicFLix
                </Link>
                <div className="flex gap-4">
                    <Button variant="ghost" className="shad-button_ghost">
                        <Image
                            src="/images/logout-svgrepo-com.svg"
                            className="w-6 h-6"
                            alt="logout"
                            width={24}
                            height={24}
                        />
                    </Button>
                    <Link
                        href="/profile"
                        className="flex justify-center items-center"
                    >
                        <Image
                            src="/images/hq720.jpg"
                            alt="profile picture"
                            className="w-8 h-8 rounded-full"
                            width={32}
                            height={32}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Topbar;
