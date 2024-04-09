import Image from "next/image";
import { profilePictureSources } from "./lib/constants";
import PostCard from "./components/home/PostCard";

export default function Home() {
  return (
    <div className="flex flex-1">
    <div className=" flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter;
          ">Home Feed</h2>
          <ul className="flex flex-col flex-1 gap-9 w-full">
          {/* <PostCard source="/images/post_img1.jpeg" /> */}

{profilePictureSources.map((profile) => (
            <PostCard key={profile.source} source={profile.source} />
))}
          </ul>
    </div>
    </div>
  );
}

