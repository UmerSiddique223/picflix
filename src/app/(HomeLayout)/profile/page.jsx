"use client";
import { Button } from "@/components/UI/button";
import { getUser } from "@/lib/userInfo";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const user = getUser();
  return (
    <div className="flex mb-2 flex-col">
      <div className="flex flex-col">
        <Image
          width={1600}
          height={160}
          src="/images/profile-default_photo.jpg"
          alt="default image"
          className="mr-2 w-[100rem] rounded-sm h-40 lg:h-44"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            height={106}
            width={106}
            src="/images/shera.jpg"
            alt="Profile Picture"
            className="rounded-full h-32 w-32 -mt-16"
          />
          <h1 className="text-2xl font-bold ">{user.username} </h1>
          <div className=" flex items-center gap-4">
            <p className="text-lg mt-4 font-bold">
              10 <span className="font-normal">posts </span>
            </p>
            <span className="text-lg mt-4">|</span>
            <p className="text-lg mt-4 font-bold">
              100 <span className="font-normal">links</span>
            </p>
          </div>
          <Button className="mt-2 w-24 h-9">Edit Profile</Button>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-3 ml-20 mt-2">
          <h2 className="text-lg font-bold text-primary">Name</h2>
          {/* {bio} */}
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Account created at: 2024-04-24</p>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <hr className="  w-[75%] mb-10 " />
          <div className="grid grid-cols-3 gap-1 ">
            <div className="relative group">
              <Image
                height={300}
                width={200}
                src="/images/afnan.png"
                alt="Post"
                className="lg:w-80 lg:h-80 h-64 w-64 hover:brightness-75  border rounded-md col-span-1"
              />
              <div className=" flex gap-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ">
                <div className="flex gap-1 items-center">
                  <Image
                    width={40}
                    height={40}
                    src="/icons/like.svg"
                    alt="like"
                  />
                  <span className="ml-1 font-bold">10</span>
                </div>
                <div className="flex gap-1 items-center">
                  <Image
                    width={40}
                    height={40}
                    src="/icons/comment.svg"
                    alt="comments"
                  />
                  <span className="ml-1 font-bold">10</span>
                </div>
              </div>
            </div>

            <Image
              height={300}
              width={200}
              src="/images/shera.jpg"
              alt="Post"
              className=" lg:w-80 lg:h-80 h-64 w-64 border rounded-md col-span-1"
            />

            <Image
              height={300}
              width={200}
              src="/images/lamp-lights-lantern-wallpaper-preview.jpg"
              alt="Post"
              className=" lg:w-80 lg:h-80 h-64 w-64 border rounded-md col-span-1"
            />

            <Image
              src="/images/lamp-lights-lantern-wallpaper-preview.jpg"
              alt="Post"
              className="lg:w-80 lg:h-80 h-64 w-64 border rounded-md"
              height={300}
              width={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
