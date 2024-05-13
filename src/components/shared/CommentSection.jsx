import React, { useState } from "react";
import { Input } from "../UI/input";
import parseDate from "@/lib/dateParser";
import { Button } from "../UI/button";
import { getUser } from "@/lib/userInfo";
import Image from "next/image";

function CommentSection({ user, comments, setComments, post }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const handleComment = async () => {
    if (!comment) {
      setError("Comment cannot be empty");
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stats/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: post,
        user_id: user,
        comment_text: comment,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setComment("");
        setError("");
        setComments([...comments, { ...data, name: "You" }]);
      });
  };
  return (
    <div>
      <div className="flex items-center gap-3">
        <Input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="bg-input border-border"
        />
        <Button onClick={handleComment}>Post</Button>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
        {comments &&
          comments.map((comment) => (
            <div key={comment.comment_id} className="flex gap-3">
              {comment.profile_picture ? (
                <Image
                  width={40}
                  height={50}
                  src={`/images/${comment.profile_picture}`}
                  alt="user"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <Image
                  width={40}
                  height={50}
                  src={`/images/default photo.png`}
                  alt="user"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                {post.name !== user.name ? (
                  <p className="font-semibold">
                    {comment.name}
                    <span className="text-xs ml-1 text-neutral-400">
                      {parseDate(comment.created_at)}
                    </span>
                  </p>
                ) : (
                  <p className="font-semibold">
                    You
                    <span className="text-xs ml-1 text-neutral-400">
                      {parseDate(comment.created_at)}
                    </span>
                  </p>
                )}
                <p>{comment.comment_text}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentSection;
