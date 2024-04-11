"use client"
import Image from "next/image";
import { profilePictureSources } from "./lib/constants";
import PostCard from "./components/home/PostCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  return (
    <div className="flex flex-1">
      
    <div className=" flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
          <Image alt="homePage" src="/images/undraw_sweet_home_dkhr.svg" width={120} height={50} />
          <ul className="flex flex-col flex-1 gap-9 w-full">
          {/* <PostCard source="/images/post_img1.jpeg" /> */}

{profilePictureSources.map((profile) => (
            <PostCard key={profile.source} source={profile.source} />
))}
          </ul>
    </div>
    <div>
      <h1>Data from API:</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}

