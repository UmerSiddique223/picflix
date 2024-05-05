"use client";
import { Button } from "@/components/UI/button";
import { getUser } from "@/lib/userInfo";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import EditProfileForm from "@/components/shared/EditProfileForm";

const ProfilePage = ({ params }) => {
  const [user, setUser] = useState({});
  const buttonRef = useRef(null);
  const [isinteracting, setIsInteracting] = useState(false);
  const [allLinks, setallLinks] = useState([]);
  const [isgotData, setisGotData] = useState(false);
  const [isFriend, setisFriend] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [profilePosts, setProfilePosts] = useState([]);

  const profileId = params.id;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(getUser());
    }
    const getPostStats = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/profile/getprofilestats`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: profileId,
            }),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setProfilePosts(data.postData);
            setTotalLinks(data.totalLinks);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getPostStats();
  }, []);

  if (currentUserId === null && user.user_id) {
    setCurrentUserId(user.user_id);
  }
  var isOwnProfile = null;

  if (user.user_id && isOwnProfile === null && currentUserId) {
    isOwnProfile = currentUserId == profileId;
  }
  const getAllLinksandUser = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/links/getlinks&user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curr_user_id: currentUserId,
          user_id: profileId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setallLinks(data.Links);
          console.log(data.User);
          setUser(data.User);
          setisGotData(true);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (!isgotData && user.user_id && isOwnProfile === false) {
    getAllLinksandUser();
  }

  if (isgotData && isFriend === null && isOwnProfile === false) {
    const friendExists = allLinks.some((link) => {
      return link.friend_id == parseInt(profileId);
    });
    setisFriend(friendExists);
  }

  // add a link
  const handleAddFriend = async () => {
    setIsInteracting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/links/addlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: currentUserId, friend_id: profileId }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.success) {
            throw new Error("Failed to insert in db");
          } else {
            setisFriend(true);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsInteracting(false);
    }
  };

  // remove a link
  const handleremoveFriend = async () => {
    setIsInteracting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/links/removelink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: currentUserId, friend_id: profileId }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.success) {
            throw new Error("Failed to delete db");
          } else {
            setisFriend(false);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsInteracting(false);
    }
  };

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
          {user.profile_picture ? (
            <Image
              height={106}
              width={106}
              src={`/images/${user.profile_picture}`}
              alt="Profile Picture"
              className="rounded-full h-32 w-32 -mt-16"
            />
          ) : (
            <Image
              height={106}
              width={106}
              src={`/images/default photo.png`}
              alt="Profile Picture"
              className="rounded-full h-32 w-32 -mt-16"
            />
          )}
          <h1 className="text-2xl font-bold ">{user.username} </h1>
          <div className=" flex items-center gap-4">
            <p className="text-lg mt-4 font-bold">
              {profilePosts.length} <span className="font-normal">posts </span>
            </p>
            <span className="text-lg mt-4">|</span>
            <p className="text-lg mt-4 font-bold">
              {totalLinks} <span className="font-normal">links</span>
            </p>
          </div>
          <div>
            {isOwnProfile ? (
              <Dialog>
                <div>
                  <DialogTrigger asChild>
                    <Button className="mt-2  h-9">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[55%] custom-scrollbar">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when youre
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <EditProfileForm buttonRef={buttonRef} />
                    <div className="relative">
                      <DialogClose
                        ref={buttonRef}
                        className="absolute bottom-4 bg-destructive h-10 w-20 rounded-sm text-destructive-foreground hover:bg-destructive/90 right-32 "
                      >
                        Cancel
                      </DialogClose>
                    </div>
                  </DialogContent>
                </div>
              </Dialog>
            ) : isFriend ? (
              <Button
                onClick={() => handleremoveFriend()}
                disabled={isinteracting}
                className="mt-2 h-9"
              >
                Remove from links
              </Button>
            ) : (
              <div>
                <Button
                  onClick={() => handleAddFriend()}
                  disabled={isinteracting}
                  className="mt-2 h-9"
                >
                  Add to links
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-3 ml-20 mt-2">
          <h2 className="text-lg font-bold text-primary"> {user.name}</h2>
          {/* {bio} */}
          <p> {user.bio}</p>
          <p>Account created at: {user.created_at}</p>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <hr className="w-[75%] mb-10 " />
          <div className="grid grid-cols-3 gap- ">
            {profilePosts.map((post) => (
              <div
                key={post.post_id}
                className="relative hover:brightness-90 group"
              >
                <Image
                  height={300}
                  width={200}
                  src={`/images/${post.media[0]}`}
                  alt="Post"
                  className="lg:w-80 lg:h-80 h-56 w-64 border col-span-1"
                />
                <div className="flex gap-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ">
                  <div className="flex gap-1 items-center">
                    <Image
                      width={50}
                      height={50}
                      src="/icons/like.svg"
                      alt="like"
                    />
                    <span className="ml-1 font-extrabold">10</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Image
                      width={45}
                      height={45}
                      src="/icons/comment.svg"
                      alt="comments"
                    />
                    <span className="ml-1 text font-extrabold">10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
