import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/UI/dialog";
import PostCard from "./PostCard";
import { Button } from "../UI/button";
export const ShowProfilePosts = ({ post, user, isOwnProfile }) => {
  console.log(post);
  const handleDeletePost = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/posts/deletepost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: post.post_id }),
      }).then((response) => {
        window.location.reload();
        return response.json();
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <div className="flex flex-col gap-1">
        <DialogTrigger asChild>
          <div className="relative hover:brightness-75 group">
            <Image
              height={300}
              width={300}
              src={`${post.media[0]}`}
              alt="Post"
              className="lg:w-80 lg:h-80 h-56 w-64 border col-span-1"
            />
          </div>
        </DialogTrigger>
      </div>
      <DialogContent className="min-w-[50%] bg-transparent p-0 mt-3 border-none custom-scrollbar">
        <div className="flex  justify-center items-center">
          <PostCard key={post.post_id} post={post} user={user} />
          {isOwnProfile && (
            <button
              onClick={handleDeletePost}
              variant="destructive"
              className="w-10 h-8 text-[red] top-[-43%] right-16 relative rounded-sm"
            >
              {" "}
              <Image src="/icons/delete.svg" fill alt="delete" />
            </button>
          )}
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
