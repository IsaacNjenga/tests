import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;
const BASE_URL = process.env.BINANCE_BASE_URL;

// Generate Binance Pay signature
const generateSignature = (payload) => {
  const hmac = crypto.createHmac("sha512", SECRET_KEY);
  hmac.update(JSON.stringify(payload));
  return hmac.digest("hex");
};

// Create a payment order
const createOrder = async (req, res) => {
  const { amount, currency, orderId } = req.body;

  const payload = {
    env: { terminalType: "WEB" }, // Payment via Web
    merchantTradeNo: orderId,
    orderAmount: amount,
    currency, // e.g., "USDT", "BUSD"
    goods: {
      goodsType: "01",
      goodsCategory: "0000",
      referenceGoodsId: "Product_123",
      goodsName: "Test Product",
    },
  };

  const signature = generateSignature(payload);

  try {
    const response = await axios.post(
      `${BASE_URL}/binancepay/openapi/v2/order`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "BinancePay-Timestamp": Date.now(),
          "BinancePay-Nonce": crypto.randomBytes(16).toString("hex"),
          "BinancePay-Certificate-SN": API_KEY,
          "BinancePay-Signature": signature,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response?.data || "Error creating order" });
  }
};

export { createOrder };
