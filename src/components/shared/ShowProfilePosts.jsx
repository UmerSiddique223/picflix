import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/UI/dialog";
import PostCard from "./PostCard";
export const ShowProfilePosts = ({ post, user }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative hover:brightness-90 cursor-pointer">
          <Image
            height={300}
            width={200}
            src={`${post.media[0]}`}
            alt="Post"
            className="lg:w-80 lg:h-80 h-56 w-64 border col-span-1"
          />
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
