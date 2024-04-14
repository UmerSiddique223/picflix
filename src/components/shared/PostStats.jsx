"use client";
import React, { useState } from "react";
import Image from "next/image";
export const PostStats = ({ toggleComments }) => {
  const [like, setLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  function handleSavePost(e) {
    e.preventDefault();
    setIsSaved(!isSaved);
  }
  function checkIsLiked() {
    return like;
  }
  function handleLikePost(e) {
    e.preventDefault();
    setLike(!like);
  }
  return (
    <div className="flex justify-between items-center z-10 mb-4">
      <div className="flex gap-3">
        <div className="flex gap-1">
          <Image
            src={`${checkIsLiked() ? "/icons/liked.svg" : "/icons/like.svg"}`}
            alt="like"
            width={30}
            height={30}
            onClick={(e) => handleLikePost(e)}
            className="cursor-pointer"
          />
          <p className="text-sm font-medium flex justify-center items-center lg:base-medium">
            69
          </p>
        </div>
        <div className="flex gap-1">
          <Image
            src="/icons/comment.svg"
            alt="comment"
            width={28}
            height={30}
            className="cursor-pointer"
            onClick={() => toggleComments((prev) => !prev)}
          />
          <p className="text-sm font-medium flex justify-center items-center lg:base-medium">
            30
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Image
          src={isSaved ? "/icons/saved.svg" : "/icons/save.svg"}
          alt="share"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  );
};
