"use client";
import parseDate from "@/lib/dateParser";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../UI/carousel";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/userInfo";

export default function StoryCard({ story }) {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const [isOwnStory, setIsOwnStory] = useState(false);
    useEffect(() => {
        setIsOwnStory(story.user_id === getUser().user_id);
    }, [story]);
    useEffect(() => {
        if (!api) {
            return;
        }
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);
    const handleDeleteStory = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stories`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ story_id: story.story_id }),
            }).then((response) => {
                window.location.reload();
                return response.json();
            });
        }
        catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <Dialog>
            <DialogTrigger>
                <div className="p-2 w-full mb-4 cursor-pointer group">
                    <div className="h-full flex items-center justify-between gap-2 border-b-2 group-hover:border-b-4 group-hover:-translate-y-1 duration-500 group-hover:bg-card-gradient transition-all p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Image
                                alt="story"
                                width={64}
                                height={64}
                                className="w-12 h-12 ring-2 ring-ring ring-offset-2 transition-all duration-500 group-hover:ring-offset-4 ring-offset-background object-center object-cover flex-shrink-0 rounded-full mr-4"
                                src={`/images/${story.profile_picture}`}
                                quality={100}
                            />
                            <div>
                                <h2 className="text-md font-medium">
                                    {story.name}
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    {parseDate(story.created_at)}
                                </p>
                            </div>
                        </div>
                        <Image
                            alt="delete"
                            width={32}
                            height={32}
                            className="flex-end shake"
                            src={`/icons/delete.svg`}
                            quality={100}
                            onClick={(e)=>{
                              e.stopPropagation();
                              handleDeleteStory()
                            }}
                        />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent
                hideClose
                className="max-w-[425px] max-h-[90vh] p-px bg-transparent border-0"
            >
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {story.media.map((file, index) => (
                            <CarouselItem
                                className="flex items-center justify-center"
                                key={index}
                            >
                                {file.startsWith("/videos") ? (
                                    <video
                                        className="rounded-lg object-cover max-h-[90vh]"
                                        controls
                                        src={file}
                                    ></video>
                                ) : (
                                    <Image
                                        width={425}
                                        height={500}
                                        src={file}
                                        alt="image"
                                        className="rounded-lg object-cover max-h-[90vh]"
                                    />
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {story.media.length > 1 && (
                        <>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                            <div className="flex justify-center items-center gap-1 mt-2">
                                {story.media.map((_, index) => (
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
            </DialogContent>
        </Dialog>
    );
}
