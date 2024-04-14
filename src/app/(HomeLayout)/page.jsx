import { profilePictureSources } from "@/lib/constants";
import PostCard from "@/components/shared/PostCard";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex ">
            <div className="flex-grow w-3/4">
                <div className="flex flex-col items-center gap-10 py-10 sm:px-5 md:px-8  lg:p-10 custom-scrollbar">
                    {/* <h2 className="text-2xl font-bold tracking-tighter">
                    Home Feed
                </h2> */}
                    <Image
                        alt="homePage"
                        src="/images/wired-outline-63-home.gif"
                        width={80}
                        height={50}
                    />
                    <ul className="flex flex-col gap-9 w-full">
                        {profilePictureSources.map((profile) => (
                            <PostCard
                                key={profile.source}
                                source={profile.source}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            {/* //Right side  data */}
            <div className=" flex flex-col gap-2 ml-64 mt-32 ">
                <div className="h-10 w-10 bg-secondary  "> </div>
                <div className="h-10 w-10 bg-destructive  "> </div>
                <div className="h-10 w-10 bg-muted  "> </div>
                <div className="h-10 w-10 bg-accent  "> </div>
                 </div>
        </div>
    );
}
