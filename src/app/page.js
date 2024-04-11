import { profilePictureSources } from "@/lib/constants";
import PostCard from "@/components/home/PostCard";

export default function Home() {
    return (
        <div>
            <div className=" flex flex-col items-center gap-10 overflow-scroll py-10 sm:px-5 md:px-8 lg:p-14 custom-scrollbar">
                <h2 className="text-2xl font-bold tracking-tighter">
                    Home Feed
                </h2>
                <ul className="flex flex-col  gap-9 w-full">
                    {profilePictureSources.map((profile) => (
                        <PostCard
                            key={profile.source}
                            source={profile.source}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

