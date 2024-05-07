"use client";
import Image from "next/image";
import parseDateTime from "@/lib/dateTimeParser";

const MyMessage = ({ user, message }) => {
    
    return (
        <div
            key={message.message_id}
            className="bg-card rounded-3xl border border-border p-5 lg:p-7 w-full max-w-screen-sm"
        >
            <div className="flex justify-end  items-center">
                <div className="flex justify-center items-center gap-3 mb-5 flex-row-reverse">
                    <Image
                        src={`/images/${user.profile_picture}`}
                        alt="creator"
                        className="w-12 h-12 rounded-full"
                        width={48}
                        height={48}
                    />

                    <div className="flex flex-col">
                    {/* <div className="flex flex-row"> */}
                        <p className="text-xs font-semiboldZ font-small lg:small-regular">
                            {parseDateTime(message.sent_on)}
                        </p>
                        <p className="text-base font-medium lg:font-bold">
                            {user.name}
                        </p>
                    {/* </div> */}
                        <div className="flex-center gap-2">
                            <p className="text-base font-small lg:font-regular">
                                {message.message_body}
                            </p>
                        </div>
                        {/* <div className="flex-center gap-2 text-text_light">
                            <p className="text-xs font-semibold lg:small-regular">
                                {message.message_media_url}
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyMessage;
