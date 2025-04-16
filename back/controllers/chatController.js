import ChatModel from "../models/Chat.js";

const createChat = async (req, res) => {
  try {
    const { avatar, message, timeStamp, username } = req.body;
    const newChat = new ChatModel({ avatar, message, timeStamp, username });
    const result = await newChat.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const fetchChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({});
    return res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {};

export { createChat, fetchChats, deleteChat };
