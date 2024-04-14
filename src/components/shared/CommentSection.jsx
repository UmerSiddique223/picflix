import React, { useEffect, useState } from "react";
import { Input } from "../UI/input";
import parseDate from "@/lib/dateParser";

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            await fetch(
                `${process.env.NEXT_PUBLIC_DOMAIN}/api/comments/${postId}`
            ).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).then((data) => {
                setComments(data);
            });
        };
        fetchComments();
    }, []);
    return (
        <div>
            <div className="flex items-center gap-3">
                <Input
                    type="text"
                    placeholder="Add a comment"
                    className="bg-input border-border"
                />
                <button className="bg-primary text-white px-3 py-2 rounded-lg">
                    Post
                </button>
            </div>
            <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
                {comments && comments.map((comment) => (
                    <div key={comment.comment_id} className="flex gap-3">
                        <img
                            src={`/images/${comment.profile_pic}`}
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
