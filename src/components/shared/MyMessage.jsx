"use client";
import Image from "next/image";
import parseDateTime, { parseDateTimeGMT } from "@/lib/dateTimeParser";

const MyMessage = ({ user, message, messages, setMessages }) => {
  const handleMessageDelete = async () => {
    setMessages(messages.filter((msg) => msg.message_id != message.message_id));
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/chat/delete-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_id: message.message_id,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  };

  return (
    <div
      key={message.message_id}
      className="bg-card rounded-3xl p-5 lg:p-7 w-fit float-right "
    >
      <div className="flex justify-end text items-center relative">
        <div className="flex justify-center items-center gap-3 mb-5 flex-row-reverse">
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
              src={`/images/default-photo.png`}
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
            <Image
              className="absolute -top-5 -right-5 shake cursor-pointer"
              width={25}
              height={50}
              alt="del"
              src={"/icons/delete.svg"}
              onClick={handleMessageDelete}
            ></Image>
            <p className="text-base font-medium lg:font-bold">{user.name}</p>
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

export default MyMessage;
