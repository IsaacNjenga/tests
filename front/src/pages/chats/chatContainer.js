import React, { useEffect, useState } from "react";
import ChatLists from "./chatLists";
import InputText from "./inputText";
import Login from "./login";
import axios from "axios";
import MenuList from "../../components/menu";

function ChatContainer() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get("http://localhost:3001/chat/fetchChats");
        if (res.data.success) {
          setChats(res.data.chats); // Directly set fetched chats
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchChats();

    // Optional: Polling for real-time updates every 5 seconds
    const intervalId = setInterval(fetchChats, 5000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const addMessage = async (chat) => {
    const newChat = {
      username: localStorage.getItem("user"),
      message: chat,
      avatar: localStorage.getItem("avatar"),
      timeStamp: new Date().toISOString(),
    };
    try {
      const res = await axios.post(
        "http://localhost:3001/chat/createChat",
        newChat
      );
      if (res.data.success) {
        setChats((prevChats) => [...prevChats, newChat]); // Add the new chat to the list
        console.log("Chat sent successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
  };

  return (
    <>
      <MenuList />
      <div>
        {user ? (
          <div className="home">
            <div className="chats_header">
              <h4>Username: {user}</h4>
              <p className="chats_logout" onClick={Logout}>
                <strong>Logout</strong>
              </p>
            </div>
            <ChatLists chats={chats} />
            <InputText addMessage={addMessage} />
          </div>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default ChatContainer;
