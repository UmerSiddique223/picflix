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
import {
  getAllLinksandUser,
  getPostStats,
  handleAddFriend,
  handleremoveFriend,
} from "@/lib/controllers/ProfileController";
import { ShowProfilePosts } from "@/components/shared/ShowProfilePosts";

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
    setUser(getUser());
    getPostStats(profileId, setTotalLinks, setProfilePosts, setTotalPosts);
  }, []);

  if (currentUserId === null && user.user_id) {
    setCurrentUserId(user.user_id);
  }

  var isOwnProfile = null;

  if (user.user_id && isOwnProfile === null && currentUserId) {
    isOwnProfile = currentUserId == profileId;
  }

  if (!isgotData && user.user_id && isOwnProfile === false) {
    getAllLinksandUser(
      profileId,
      currentUserId,
      setallLinks,
      setUser,
      setisGotData
    );
  }

  if (isgotData && isFriend === null && isOwnProfile === false) {
    const friendExists = allLinks.some((link) => {
      return link.friend_id == parseInt(profileId);
    });
    setisFriend(friendExists);
  }

  return (
    <div className="flex mb-2 flex-col">
      <div className="flex flex-col">
        <div
          alt="default image"
          className="mr-2 w-[100rem] bg-profile-cover  rounded-sm h-40 lg:h-52"
        >
          Afnan
        </div>
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
              {totalPosts} <span className="font-normal">posts </span>
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
                onClick={() =>
                  handleremoveFriend(
                    currentUserId,
                    profileId,
                    setIsInteracting,
                    setisFriend
                  )
                }
                disabled={isinteracting}
                className="mt-2 h-9"
              >
                Remove from links
              </Button>
            ) : (
              <div>
                <Button
                  onClick={() =>
                    handleAddFriend(
                      currentUserId,
                      profileId,
                      setIsInteracting,
                      setisFriend
                    )
                  }
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
              <ShowProfilePosts key={post.post_id} post={post} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
