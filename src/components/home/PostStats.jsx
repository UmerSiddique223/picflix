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
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <Image
                    src={`${
                        checkIsLiked()
                            ? "/assets/icons/liked.svg"
                            : "/assets/icons/like.svg"
                    }`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="text-sm font-medium  lg:base-medium">69</p>
            </div>

            <div className="flex gap-2">
                <Image
                    src={isSaved ? "/images/saved.svg" : "/images/save.svg"}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSavePost(e)}
                />
            </div>
        </div>
    );
};
