"use client";
import parseDateTime from "@/lib/dateTimeParser";
import { useRouter } from 'next/navigation';

function ConversationBox({ user, conversation }) {
  // console.log(user);
  const router = useRouter();

  const handleConversationClick = (Id) => {
    // Redirect the user to the conversation page with the selected user
    router.push(`/chat/${Id}`);
  };
  return (
    <button onClick={() => handleConversationClick(conversation.conversation_id)}>
      <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
        <div key={user.user_id} className="flex gap-3">
          <img
            src={`/images/${user.profile_picture}`}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">
              {user.name}
              <span className="text-xs ml-1 text-neutral-400">
                {parseDateTime(conversation.last_updated)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ConversationBox;
