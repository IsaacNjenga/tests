import moment from "moment";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const stkpush = async (req, res) => {
  const { phoneNumber, accountNumber, amount } = req.body;

  const timeStamp = moment().format("YYYYMMDDHHmmss");
  const shortCode = "174379";
  const passKey = process.env.MPESA_PASS_KEY;

  const password = new Buffer.from(shortCode + passKey + timeStamp).toString(
    "base64"
  );

  const phoneNo = phoneNumber.substring(1);
  const token = req.token;

  await axios
    .post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline", //till: "CustomerBuyGoodsOnline"
        Amount: amount,
        PartyA: `254${phoneNo}`,
        PartyB: shortCode,
        PhoneNumber: `254${phoneNo}`,
        CallBackURL: `https://fc31-105-163-157-229.ngrok-free.app/back/callback`,
        AccountReference: accountNumber,
        TransactionDesc: "Mpesa API test",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((data) => {
      console.log(data.data);
      res.status(200).json(data.data);
    })
    .catch((error) => {
      console.error("STK Push Error:", error.response?.data || error.message);
      res.status(400).json(error.response?.data || error.message);
    });
};

export { stkpush };
