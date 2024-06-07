"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../UI/input";
import { Button } from "../UI/button";
import MyMessage from "@/components/shared/MyMessage";
import OtherMessage from "@/components/shared/OtherMessage";
import Link from "next/link";
import io from "socket.io-client";
import InputEmoji from "react-input-emoji";
import Image from "next/image";
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
      // message_id: Math.random(),
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
    console.log("user_idededed", user.user_id);
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
  return (
    <div className="">
      <Link href="/chat" className="hover:bg-gray-600 h-10 w-20">
        <Button variant="ghost" className="w-32 flex items-center gap-3">
          {" "}
          <Image
            src="/icons/back.svg"
            alt="back"
            height={20}
            width={25}
          ></Image>{" "}
          <p className="text-lg">Chats</p>
        </Button>
      </Link>

      <div className="flex flex-col overflow-auto custom-scrollbar gap-3 mt-3">
        {messages.map((message, index) => {
          const isMine = message.created_by === user.user_id;
          const MessageComponent = isMine ? MyMessage : OtherMessage;
          const sentBy = isMine ? user : otherUser;

          return (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <MessageComponent
                user={sentBy}
                message={message}
                messages={messages}
                setMessages={setMessages}
              />
            </div>
          );
        })}
      </div>
      <div className="sticky lg:bottom-0 bottom-[71px] max-w-screen-md bg-background py-2 lg:py-6 flex  items-center gap-3">
        <InputEmoji
          value={newMessage}
          onChange={setNewMessage}
          keepOpened={true}
          background="#0C0C0D"
          color="#ffffff"
          borderColor="#9333EA"
          placeholder="Type a message"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleNewMessage();
              sendMessage();
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
  );
}

export default MessagesContainer;
