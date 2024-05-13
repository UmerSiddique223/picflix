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

export default function StoryCard({ story }) {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2 w-full mb-4 cursor-pointer group">
          <div className="h-full flex items-center gap-2 border-b-2 group-hover:border-b-4 group-hover:-translate-y-1 duration-500 group-hover:bg-card-gradient transition-all p-4 rounded-lg">
            {story.profile_picture ? (
              <Image
                alt="story"
                width={64}
                height={64}
                className="w-12 h-12 ring-2 ring-ring ring-offset-2 transition-all duration-500 group-hover:ring-offset-4 ring-offset-background object-none object-center flex-shrink-0 rounded-full mr-4"
                src={`/images/${story.profile_picture}`}
              />
            ) : (
              <Image
                alt="story"
                width={64}
                height={64}
                className="w-12 h-12 ring-2 ring-ring ring-offset-2 transition-all duration-500 group-hover:ring-offset-4 ring-offset-background object-none object-center flex-shrink-0 rounded-full mr-4"
                src={`/images/default photo.png`}
              />
            )}
            <div>
              <h2 className="text-md font-medium">{story.name}</h2>
              <p className="text-muted-foreground text-sm">
                {parseDate(story.created_at)}
              </p>
            </div>
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
