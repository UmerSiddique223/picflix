"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../UI/input";
import parseDate from "@/lib/dateParser";
import { Button } from "../UI/button";
import { useRouter } from "next/navigation";
import MyMessage from "@/components/shared/MyMessage";
import { useRouter } from "next/navigation";
import OtherMessage from "@/components/shared/OtherMessage";
import MyMessage from "@/components/shared/MyMessage";
import Link from "next/link";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

//   return (
//     <div>
//       <h1>Real-Time Chat</h1>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

function MessagesContainer({
  user,
  otherUser,
  initialMessages,
  conversation_id,
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("chat message", newMessage);
    setNewMessage("");
  };

  const [new_message, setMessage] = useState("");
  const handleNewMessage = async () => {
    if (!new_message) {
      setError("Message cannot be empty");
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/chat/new-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_body: new_message,
        user_id: user.user_id,
        conversation_id: conversation_id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setMessage("");
      });
  };
  return (
    <div>
      <Link href="/chat">Back to Chats</Link>

      <div className="flex flex-col overflow-auto custom-scrollbar gap-3 mt-3">
        {messages.map((message) => {
          const isMine = message.created_by === user.user_id;
          const MessageComponent = isMine ? MyMessage : OtherMessage;
          const sentBy = isMine ? user : otherUser;

          return (
            <>
              <MessageComponent user={sentBy} message={message} />
            </>
          );
        })}
        <div className="flex items-center gap-3">
          <Input
            type="text"
            value={new_message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"
            className="bg-input border-border"
          />
          <Button
            onClick={() => {
              handleNewMessage();
              sendMessage();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
