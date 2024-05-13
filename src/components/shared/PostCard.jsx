"use client";
import Image from "next/image";
import { PostStats } from "./PostStats";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/UI/carousel";
import { useEffect, useState } from "react";
import parseDate from "@/lib/dateParser";
import CommentSection from "./CommentSection";
const PostCard = ({ key, user, post }) => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [commentSection, toggleCommentSection] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [stats, setStats] = useState({
    likes: 0,
    comments: 0,
    isSaved: false,
  });
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  useEffect(() => {
    const fetchStats = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stats`, {
        method: "POST",
        body: JSON.stringify({
          post_id: post.post_id,
          user_id: user.user_id,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setComments(data.comments);
          setStats({
            likes: data.likes?.length ? data.likes.length : 0,
            comments: data.comments?.length ? data.comments.length : 0,
            isSaved: data.isSaved,
          });
          if (data.likes.some((item) => item.likes === 1)) {
            setIsLiked(true);
          }
        });
    };
    fetchStats();
  }, []);
  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      comments: comments.length,
    }));
  }, [comments]);
  return (
    <div
      key={key}
      className="bg-card rounded-3xl border border-border p-5 w-full  lg:w-[80%] max-w-screen-sm"
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3 mb-5">
          {post.profile_picture ? (
            <Image
              src={`/images/${post.profile_picture}`}
              alt="creator"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
          ) : (
            <Image
              src={`/images/default-photo.png`}
              alt="creator"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
          )}
          <div className="flex gap-1 flex-col">
            <div className="flex items-center justify-center gap-2">
              <div>
                {post.name !== user.name ? (
                  <p className="text-lg font-medium lg:font-bold">
                    {post.name}
                  </p>
                ) : (
                  <p className="text-lg font-medium lg:font-bold">You</p>
                )}
              </div>
              <div>
                <p className="text-[0.78rem] mt-1 font-normal lg:small-regular">
                  {parseDate(post.created_at)}
                </p>
              </div>
            </div>
            <div className="flex-center gap-2 text-text_light">
              <p className="text-sm font-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {post.media.map((file, index) => (
            <CarouselItem
              className="flex items-center my-2 justify-center"
              key={index}
            >
              <Image
                width={500}
                height={500}
                src={file}
                alt="image"
                className="h-72 sm:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {post.media.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
            <div className="flex justify-center items-center gap-1">
              {post.media.map((_, index) => (
                <div
                  key={index}
                  className={`${
                    current === index
                      ? "h-3 w-3 bg-primary"
                      : "h-2 w-2 bg-muted"
                  } rounded-full`}
                ></div>
              ))}
            </div>
          </>
        )}
      </Carousel>
      <p className="mt-2 mb-4 text-base font-semibold leading-5 lg:small-regular">
        {post.caption}
      </p>
      <PostStats
        user={user.user_id}
        post={post.post_id}
        isLiked={isLiked}
        stats={stats}
        setStats={setStats}
        toggleComments={toggleCommentSection}
      />
      {commentSection && (
        <CommentSection
          user={user.user_id}
          comments={comments}
          setComments={setComments}
          post={post.post_id}
        />
      )}
    </div>
  );
};

export default PostCard;
