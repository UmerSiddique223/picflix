"use client";
import parseDateTime, { parseDateTimeGMT } from "@/lib/dateTimeParser";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ConversationBox({ user, conversation }) {
  // console.log(user);
  const router = useRouter();

  const handleConversationClick = (Id) => {
    // Redirect the user to the conversation page with the selected user
    router.push(`/chat/${Id}`);
  };
  return (
    <button
      onClick={() => handleConversationClick(conversation.conversation_id)}
    >
      <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
        <div key={user.user_id} className="flex gap-3">
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
              src={`/images/default photo.png`}
              alt="creator"
              className="w-12 h-12 rounded-full"
              width={48}
              height={48}
            />
          )}
          <div>
            <p className="font-semibold">
              {user.name}
              <span className="text-xs ml-1 text-neutral-400">
                {parseDateTimeGMT(conversation.last_updated)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ConversationBox;
