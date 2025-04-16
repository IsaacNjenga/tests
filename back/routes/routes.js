import express from "express";
import multer from "multer";
const router = express.Router();

import {
  createChat,
  fetchChats,
  deleteChat,
} from "../controllers/chatController.js";

import { getUploads, uploadFile } from "../controllers/uploadController.js";
import { stkpush } from "../controllers/mpesaController.js";
import { generateToken } from "../middleware/generateToken.js";
import { mpesaModel } from "../models/Mpesa.js";
import { checkout } from "../controllers/stripeController.js";
import { pesapal } from "../controllers/pesapalController.js";
import { accessToken } from "../middleware/accessToken.js";
import { sendEmail } from "../controllers/emailController.js";
import { invoice, makePayment } from "../controllers/intasendController.js";
import {
  initializePayment,
  verifyPayment,
} from "../controllers/paystackController.js";
import { createOrder } from "../controllers/binanceController.js";
import { coinbaseCheckout } from "../controllers/coinbaseController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//chat routes
router.post("/createChat", createChat);
router.get("/fetchChats", fetchChats);
router.delete("/deleteChat", deleteChat);

//upload routes
router.post("/uploadFiles", upload.single("file"), uploadFile);
router.get("/getUploads", getUploads);

//email route
router.post("/send-email", sendEmail);

//stripe route
router.post("/create-checkout-session", checkout);

//pesapal route
router.get("/authToken", accessToken);
router.post("/initiate-payment", accessToken, pesapal);

//intasend route
router.post("/intasend-payment", makePayment);
router.get("/get-invoice", invoice);

//paystack route
router.post("/initialize-payment", initializePayment);
router.get("/verify-payment", verifyPayment);

//binance route
router.post("/create-order", createOrder);

//coinbase route
router.post("/coinbase-checkout", coinbaseCheckout);


//mpesa routes
router.post("/stkpush", generateToken, stkpush);
router.get("/token", generateToken);
router.post("/callback", async (req, res) => {
  //console.log("Incoming Callback Request:");
  //console.log("Body:", req.body);

  try {
    if (req.body?.Body?.stkCallback?.CallbackMetadata?.Item) {
      const metadata = req.body.Body.stkCallback.CallbackMetadata.Item;

      console.log("Callback Metadata:", metadata);

      const phone = metadata[4]?.Value;
      const amount = metadata[0]?.Value;
      const trnx_id = metadata[1]?.Value;

      console.log("Phone:", phone);
      console.log("Amount:", amount);
      console.log("Transaction ID:", trnx_id);

      if (!phone || !amount || !trnx_id) {
        throw new Error("Missing required fields: phone");
      } else if (!amount) {
        throw new Error("Missing required fields: amount");
      } else if (!trnx_id) {
        throw new Error("Missing required fields: trnx_id");
      }

      const newPayment = new mpesaModel({ phone, amount, trnx_id });
      const result = await newPayment.save();

      res.status(200).json({ success: true, result });
    } else {
      console.error("Invalid Callback Data:", req.body);
      res.status(400).json({ message: "Invalid Callback Data" });
    }
  } catch (error) {
    console.error("Error processing callback:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export { router as Router };
