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
import Loading from "../../loading";
import parseDate from "@/lib/dateParser";

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
  const [isOwnProfile, setIsOwnProfile] = useState([]);

  const profileId = params.id;

  useEffect(() => {
    const currUser = getUser();
    setCurrentUserId(currUser.user_id);
    const currentUserId = currUser.user_id;
    const isOwnProfile = currentUserId == profileId;
    setIsOwnProfile(currentUserId == profileId);
    console.log(isOwnProfile, currentUserId, currUser);
    if (isOwnProfile) {
      setUser(currUser);
    }
    getPostStats(profileId, setTotalLinks, setProfilePosts, setTotalPosts);
  }, [profileId, currentUserId]);

  if (!isgotData && isOwnProfile === false) {
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
    <>
      {user.user_id ? (
        <div className="flex mb-2 flex-col">
          <div className="flex flex-col">
            <Image
              width={1600}
              height={160}
              src="/images/bg-cover.jpg"
              alt="default image"
              className="mr-2 w-[100rem] rounded-sm h-40 lg:h-44"
            />
            <div className="flex flex-col items-center justify-center">
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
                  src={`/images/default-photo.png`}
                  alt="Profile Picture"
                  className="rounded-full h-32 w-32 -mt-16"
                />
              )}
              <div className="my-2">
                <h1 className="text-2xl font-bold text-center">{user.name}</h1>
                <h2 className="text-lg text-muted-foreground text-center">
                  {user.username}
                </h2>
                <p className="max-w-72 text-center mt-2">{user.bio}</p>
              </div>
              <div className="flex items-center gap-4 w-3/4 mb-4">
                <p className="flex justify-center gap-2 text-lg mt-4 font-semibold w-1/3 py-4 border-r-2 border-primary">
                  <span className="font-normal">Joined on</span>
                  {parseDate(user.created_at)}
                </p>
                <p className="flex justify-center gap-2 text-lg mt-4 font-bold w-1/3 py-4 border-r-2 border-primary">
                  {totalPosts}
                  <span className="font-normal">posts</span>
                </p>
                <p className="flex justify-center gap-2 text-lg mt-4 font-bold w-1/3 py-4">
                  {totalLinks}
                  <span className="font-normal">links</span>
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
                            Make changes to your profile here. Click save when
                            youre done.
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
          <div className="my-8 flex flex-col justify-center items-center">
            <hr className="w-[75%] mb-10" />
            <div className="grid grid-cols-3 lg:gap-1">
              {profilePosts.map((post) => (
                <ShowProfilePosts
                  key={post.post_id}
                  post={post}
                  user={user}
                  isOwnProfile={isOwnProfile}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfilePage;
