"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
export const PostStats = ({
    user,
    post,
    isLiked,
    stats,
    setStats,
    toggleComments,
}) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [debouncedLike, setDebouncedLike] = useState(like);
    const [debouncedSaved, setDebouncedSaved] = useState(stats.isSaved);
    const updateSavedTimeout = useRef(null);
    const updateLikesTimeout = useRef(null);

    function handleSavePost() {
        setSaved(!saved);
    }
    function handleLikePost() {
        if (like) {
            setStats((prev) => ({ ...prev, likes: prev.likes - 1 }));
        } else {
            setStats((prev) => ({ ...prev, likes: prev.likes + 1 }));
        }
        setLike(!like);
    }

    const updateLikesInDatabase = () => {
        if ((debouncedLike && !isLiked) || (!debouncedLike && isLiked)) {
            fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stats/like`, {
                method: "POST",
                body: JSON.stringify({
                    post_id: post,
                    user_id: user,
                    isliked: debouncedLike,
                }),
            });
        }
    };
    const updateSavedInDatabase = () => {
        if ((debouncedSaved && !stats.isSaved) || (!debouncedSaved && stats.isSaved)) {
            fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stats/save`, {
                method: "POST",
                body: JSON.stringify({
                    post_id: post,
                    user_id: user,
                    isSaved: debouncedSaved,
                }),
            });
        }
    };

    useEffect(() => {
        if (isLiked) {
            setLike(true);
        }
    }, [isLiked]);
    useEffect(() => {
        if(stats.isSaved) {
            setSaved(true);
        }
    }, [stats.isSaved]);

    useEffect(() => {
        updateSavedInDatabase();
    }, [debouncedSaved]);
    useEffect(() => {
        updateLikesInDatabase();
    }, [debouncedLike]);

    useEffect(() => {
        if (updateLikesTimeout.current) {
            clearTimeout(updateLikesTimeout.current);
        }
        updateLikesTimeout.current = setTimeout(() => {
            setDebouncedLike(like);
        }, 1000);
    }, [like]);
    useEffect(() => {
        if (updateSavedTimeout.current) {
            clearTimeout(updateSavedTimeout.current);
        }
        updateSavedTimeout.current = setTimeout(() => {
            setDebouncedSaved(saved);
        }, 1000);
    }, [saved]);

    return (
        <div className="flex justify-between items-center z-10 mb-4">
            <div className="flex gap-3">
                <div className="flex gap-1">
                    <Image
                        src={`${like ? "/icons/liked.svg" : "/icons/like.svg"}`}
                        alt="like"
                        width={30}
                        height={30}
                        onClick={handleLikePost}
                        className="cursor-pointer"
                    />
                    <p className="text-sm font-medium flex justify-center items-center lg:base-medium">
                        {stats.likes}
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
                        {stats.comments}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <Image
                    src={saved ? "/icons/saved.svg" : "/icons/save.svg"}
                    alt="share"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                    onClick={handleSavePost}
                />
            </div>
        </div>
    );
};
