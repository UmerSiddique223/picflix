"use client";
import Image from "next/image";
import parseDateTime, { parseDateTimeGMT } from "@/lib/dateTimeParser";

const OtherMessage = ({ user, message, messages, setMessages }) => {
  return (
    <div
      key={message.message_id}
      className="bg-card rounded-3xl border border-border p-5 lg:p-7 w-fit"
    >
      <div className="flex justify-between  max-w-screen-sm items-center">
        <div className="flex justify-center items-center gap-3 mb-5">
          {user.profile_picture ? (
            <Image
              src={`/images/${user.profile_picture}`}
              alt="creator"
              className="w-12 h-12 rounded-full"
              width={48}
              height={48}
            />
          ) : (
            <Image
              src={"/images/default-photo.png"}
              alt="creator"
              className="w-12 h-12 rounded-full"
              width={48}
              height={48}
            />
          )}

          <div className="flex flex-col">
            <p className="text-xs font-semiboldZ font-small lg:small-regular">
              {parseDateTimeGMT(message.sent_on)}
            </p>
            <p className="text-base font-medium lg:font-bold">{user.name}</p>
            {/* </div> */}
            <div className="flex-center gap-2">
              <p className="text-base font-small lg:font-regular md:max-w-[600px] max-w-[250px] break-words">
                {message.message_body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherMessage;
