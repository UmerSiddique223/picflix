"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../UI/input";
import { Button } from "../UI/button";
import MyMessage from "@/components/shared/MyMessage";
import OtherMessage from "@/components/shared/OtherMessage";
import Link from "next/link";
import io from "socket.io-client";
import InputEmoji from "react-input-emoji";
const socket = io("http://localhost:3001", { autoConnect: false });

function MessagesContainer({
  user,
  otherUser,
  initialMessages,
  conversation_id,
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const lastMessageRef = useRef(null);
  // const inputRef = useRef(null);
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("chat message", (message) => {
      if (message.conversation_id === conversation_id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    return () => {
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const message = {
      sent_on: Date.now() + 5 * 60 * 60 * 1000,
      message_body: newMessage,
      created_by: user.user_id,
      conversation_id: conversation_id,
      message_media_url: null,
      name: user.name,
      profile_picture: user.profile_picture,
    };
    socket.emit("chat message", message);
    setNewMessage("");
  };

  const handleNewMessage = async () => {
    if (!newMessage) {
      setError("Message cannot be empty");
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/chat/new-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_body: newMessage,
        user_id: user.user_id,
        conversation_id: conversation_id,
      }),
    }).then((res) => {
      if (res.ok) {
        setNewMessage("");
        return res.json();
      }
    });
  };
  function handleOnEnter(newMessage) {
    console.log("enter", newMessage);
  }
  return (
    <div>
      <Link href="/chat">Back to Chats</Link>

      <div className="flex flex-col relative overflow-auto custom-scrollbar gap-3 mt-3">
        {messages.map((message, index) => {
          const isMine = message.created_by === user.user_id;
          const MessageComponent = isMine ? MyMessage : OtherMessage;
          const sentBy = isMine ? user : otherUser;

          return (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <MessageComponent user={sentBy} message={message} />
            </div>
          );
        })}
        <div className="max-w-[750px] flex sticky bottom-0 items-center gap-3">
          <InputEmoji
            value={newMessage}
            onChange={setNewMessage}
            background="#0C0C0D"
            color="#ffffff"
            borderColor="#9333EA"
            placeholder="Type a message"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleNewMessage();
                sendMessage();
                document.activeElement.blur();
              }
            }}
          />
          <Button
            className="w-32"
            disabled={!newMessage}
            onClick={(e) => {
              e.preventDefault();
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
