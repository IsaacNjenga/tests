import dotenv from "dotenv";
dotenv.config({});
import axios from "axios";

const secret_key = process.env.PAYSTACK_SECRET_KEY;
const public_key = process.env.PAYSTACK_PUBLIC_KEY;

const initializePayment = async (req, res) => {
  const { email, amount } = req.body;

  try {
    if (!email || !amount) {
      return res
        .status(400)
        .json({ success: false, msg: "Email and amount are required" });
    }

    const formattedAmount = parseFloat(amount).toFixed(2) * 100;

    const url = "https://api.paystack.co/transaction/initialize";
    const headers = {
      Authorization: `Bearer ${secret_key}`,
      "Content-Type": "application/json",
    };
    const data = {
      email: email,
      amount: formattedAmount,
      callback_url: "http://localhost:3000/success",
      currency: "KES",
      cancel_action: "http://localhost:3000/cancel",
    };

    const response = await axios.post(url, data, { headers });
    //    console.log(response.data);
    if (response.data) {
      const responseData = response.data;
      return res.status(200).json({
        success: true,
        responseData: responseData,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Error initializing payment" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ error: "No refence_no found" });
    }
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const headers = {
      Authorization: `Bearer ${secret_key}`,
    };

    const response = await axios.get(url, { headers });
    console.log(response.data);
    if (response.data) {
      const responseData = response.data;
      return res.status(200).json({
        success: true,
        responseData: responseData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error verifying payment" });
  }
};
export { initializePayment, verifyPayment };
