import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MenuList from "../../components/menu";

const socket = io("http://localhost:3001");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };
  return (
    <>
      <MenuList />
      <div style={{ padding: "20px" }}>
        <h2>Real-Time Chat</h2>
        <div
          style={{
            border: "1px solid black",
            height: "200px",
            overflowY: "scroll",
            padding: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default Chat;
