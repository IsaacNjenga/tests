import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    avatar: { type: String },
    message: { type: String },
    timeStamp: { type: String },
    username: { type: String },
  },
  { collection: "message", timestamps: true }
);

const ChatModel = mongoose.model("message", chatSchema);
export default ChatModel;
