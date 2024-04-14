import Image from "next/image";
import { PostStats } from "./PostStats";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../UI/carousel";
const PostCard = ({ key, post }) => {
    const parseDate = (d) => {
        const date = d.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        });
        return date;
    };
    return (
        <div
            key={key}
            className="bg-card rounded-3xl border border-border p-5 lg:p-7 w-full max-w-screen-sm"
        >
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                    <Image
                        src={`/images/${post.profile_pic}`}
                        alt="creator"
                        className="w-12 h-12 rounded-full"
                        width={48}
                        height={48}
                    />

                    <div className="flex flex-col">
                        <p className="text-base font-medium lg:font-bold">
                            {post.name}
                        </p>
                        <div className="flex-center gap-2">
                            <p className="text-xs font-semibold  lg:small-regular ">
                                {parseDate(post.created_at)}
                            </p>
                        </div>
                        <div className="flex-center gap-2 text-text_light">
                            <p className="text-xs font-semibold  lg:small-regular">
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Carousel>
                <CarouselContent>
                    {post.media.map((file, index) => (
                        <CarouselItem
                            className="flex items-center justify-center"
                            key={index}
                        >
                            <Image
                                width={600}
                                height={500}
                                src={`/images/${file}`}
                                alt="image"
                                className="h-64 sm:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-8" />
                <CarouselNext className="-right-8" />
            </Carousel>
            <PostStats />
            <div>
                <p className="text-sm font-semibold leading-5 lg:small-regular">
                    {post.caption}
                </p>
            </div>
        </div>
    );
};

export default PostCard;
