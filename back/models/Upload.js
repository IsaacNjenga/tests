import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    title: { type: String },
    file: { type: String },
    filePath: { type: String },
  },
  { collection: "upload", timestamps: true }
);

const UploadModel = mongoose.model("upload", uploadSchema);
export default UploadModel;
