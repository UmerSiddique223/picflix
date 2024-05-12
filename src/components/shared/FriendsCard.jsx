"use client";
import parseDate from "@/lib/dateParser";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        router.push(`/chat/${data}`);
      });
  };
  return (
    <button onClick={() => handleFriendClick(friend.user_id)}>
      <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
        <div key={friend.user_id} className="flex gap-3">
          {friend.profile_picture ? (
            <Image
              src={`/images/${friend.profile_picture}`}
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
            <p className="font-semibold">{friend.name}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default FriendsCard;
