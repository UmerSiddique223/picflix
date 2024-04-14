import Image from "next/image";
import { PostStats } from "./PostStats";

const PostCard = ({ source }) => {
    return (
        <div className="bg-card rounded-3xl flex flex-col gap-3  p-3 lg:p-5 w-full max-w-screen-sm">
            <div className="flex justify-between  items-center">
                <div className="flex justify-center items-center gap-3">
                    <Image
                        src="/images/hq720.jpg"
                        alt="creator"
                        className="w-12 h-12 rounded-full"
                        width={48}
                        height={48}
                    />

                    <div className="flex flex-col">
                        <div className="flex gap-2 items-center justify-center">
                        <p className="text-base font-medium  lg:font-bold text-[#FFFFFF]">
                            Maaz Ahmad
                        </p>
                            <p className="text-xs font-semibold  lg:small-regular ">
                                24-2-2024
                            </p>
                            </div>
                        <div className=" gap-2 text-text_light">
                            <p className="text-xs font-semibold  lg:small-regular">
                                Kachupura
                            </p>
                        </div>
                    </div>
                </div>
            </div>
<div>
            <img
                src={source}
                alt="post image"
                className="h-64 sm:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover "
            />
</div>

            <PostStats  />
            <div> <p className="text-sm font-normal leading-5 lg:small-regular">
    Maaz khan from Multan. He is a good Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non nam placeat, officia aperiam numquam quis perspiciatis recusandae tempora libero veritatis! Nam natus culpa itaque voluptatem. Voluptatibus obcaecati quibusdam possimus dignissimos?
    </p></div>
        </div>
    );
};

export default PostCard;
