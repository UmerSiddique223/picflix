import Image from "next/image";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import PostCard from "./PostCard";
export const ShowProfilePosts = ({ post, user }) => {
  console.log(post);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative hover:brightness-90 group">
          <Image
            height={300}
            width={200}
            src={`${post.media[0]}`}
            alt="Post"
            className="lg:w-80 lg:h-80 h-56 w-64 border col-span-1"
          />
          <div className="flex gap-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ">
            <div className="flex gap-1 items-center">
              <Image width={50} height={50} src="/icons/like.svg" alt="like" />
              <span className="ml-1 text-2xl font-extrabold">10</span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                width={45}
                height={45}
                src="/icons/comment.svg"
                alt="comments"
              />
              <span className="ml-1 text-2xl font-extrabold">10</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[50%] bg-transparent p-0 mt-3 border-none custom-scrollbar">
        <div className="flex justify-center items-center">
          <PostCard key={post.post_id} post={post} user={user} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
