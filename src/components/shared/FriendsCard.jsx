"use client";
import parseDate from "@/lib/dateParser";
import { useRouter } from 'next/navigation';

function FriendsCard({ user, friend }) {
  const router = useRouter();

  const handleFriendClick = async (friendId) => {
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/chat/new-conversation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_user: user.user_id,
            second_user: friendId,
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then((data) => {
        router.push(`/chat/${data}`);
    });
}
  return (
    <button onClick={() => handleFriendClick(friend.user_id)}>
      <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
        <div key={friend.user_id} className="flex gap-3">
          <img
            src={`/images/${friend.profile_picture}`}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">
              {friend.name}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default FriendsCard;
