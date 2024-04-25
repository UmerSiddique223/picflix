import { Button } from "@/components/UI/button";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-center gap-10 mt-20  ">
        <div className="mt-8 -ml-20 items-center">
          <Image
            height={96}
            width={96}
            src="/images/default photo.png"
            alt="Profile"
            className="rounded-full h-24 w-24 "
          />
          <div className="flex mt-3 items-center justify-center   gap-4">
            <Button className="mt-2 h-9">Edit Profile</Button>
          </div>
        </div>
        <div className="flex flex-col  gap-7 ">
          <div className="mt-8 flex items-center  gap-4">
            <h1 className="text-xl font-bold mt-4">Username</h1>

            <p className="text-lg mt-4 font-bold">
              10 <span className="font-normal">posts</span>
            </p>
            <p className="text-lg mt-4 font-bold">
              100 <span className="font-normal">links</span>
            </p>
          </div>
          <div className=" flex flex-col gap-5 mt-2">
            <h2 className="text-lg font-semibold">Name</h2>
            <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Account created at: 2024-04-24</p>
            <p>Stats: Some stats here</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-start md:gap-5 sm:gap-10 lg:gap-12 p-20">
        <Image
          height={300}
          width={400}
          src="/images/afnan.png"
          alt="Post"
          className="w-96 h-96 border rounded-md "
        />

        <Image
          height={600}
          width={400}
          src="/images/shera.jpg"
          alt="Post"
          className=" w-96 h-96 border rounded-md "
        />

        <Image
          height={600}
          width={400}
          src="/images/lamp-lights-lantern-wallpaper-preview.jpg"
          alt="Post"
          className=" w-96 h-96 border rounded-md "
        />

        <Image
          src="/images/lamp-lights-lantern-wallpaper-preview.jpg"
          alt="Post"
          className="w-96 h-96 border rounded-md "
          height={600}
          width={400}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
