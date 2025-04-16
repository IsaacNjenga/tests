import UploadModel from "../models/Upload.js";

const uploadFile = async (req, res) => {
  const title = req.body.title;
  const file = req.file.filename;
  try {
    const filePath = `/files/${req.file.filename}`;
    const newUpload = new UploadModel({
      title: title,
      file: file,
      filePath: filePath,
    });
    const result = await newUpload.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed", error });
  }
};

const getUploads = async (req, res) => {
  try {
    const results = await UploadModel.find({});
    return res.status(201).json({ success: true, results });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Cannot fetch files", error });
  }
};

export { uploadFile, getUploads };
