import React from "react";
import "../../assets/css/chatLists.css";
import { format } from "date-fns";

function ChatLists({ chats }) {
  const user = localStorage.getItem("user");

  function ChatMessage({ message, username, avatar, timeStamp, isSender }) {
    let formattedTime = "Invalid time";

    // Ensure timeStamp is valid and parse it correctly
    if (timeStamp && !isNaN(new Date(timeStamp))) {
      formattedTime = format(new Date(timeStamp), "HH:mm");
    }

    return (
      <div className={isSender ? "chat-sender" : "chat-receiver"}>
        <img src={avatar} alt="avatar" />
        <p>
          <strong>{username}</strong>
          <br />
          {message}
          <br />
          <span>{formattedTime}</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>ChatLists</h1>
      <div className="chats-lists">
        {chats.map((chat, index) => (
          <ChatMessage
            key={index}
            message={chat.message}
            username={chat.username}
            avatar={chat.avatar}
            timeStamp={chat.timeStamp}
            isSender={chat.username === user}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatLists;
