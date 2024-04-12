"use client";
import React, { useState } from "react";
import Image from "next/image";
export const PostStats = () => {
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
        <div className="flex  justify-between items-center z-20">
            <div className="flex gap-2 mr-5 ">
                <Image
                    src={`${
                        checkIsLiked()
                            ? "/images/liked.svg"
                            : "/images/like.svg"
                    }`}
                    alt="like"
                    width={25}
                    height={25}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="text-sm font-medium flex justify-center items-center lg:base-medium">69</p>
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
