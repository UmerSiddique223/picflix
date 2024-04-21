import React, { useEffect, useState } from "react";
import { Input } from "../UI/input";
import parseDate from "@/lib/dateParser";
import { Button } from "../UI/button";

function CommentSection({ comments, setComments, post }) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const handleComment = async () => {
        if(!comment){
            setError("Comment cannot be empty");
            return;
        }
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/comments/${post}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id: post,
                user_id: 1, //hardcoded for now
                comment_text: comment,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((data) => {
            console.log(data);
            setComment("");
            setError("");
            setComments([...comments, {...data, name: "You"}]);
        });
    }
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
                <Button onClick={handleComment}>
                    Post
                </Button>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
                {comments && comments.map((comment) => (
                    <div key={comment.comment_id} className="flex gap-3">
                        <img
                            src={`/images/${comment.profile_picture}`}
                            alt="user"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-semibold">{comment.name}<span className="text-xs ml-1 text-neutral-400">{parseDate(comment.created_at)}</span></p>
                            <p>{comment.comment_text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
