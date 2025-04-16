import axios from "axios";

const pesapal = async (req, res) => {
  const { amount, email, phoneNumber } = req.body;
  console.log(req.body);
  try {
    const token = req.token;
    const orderDetails = {
      id: `order-${Date.now()}`, // Unique order ID
      amount: amount, // Amount in KES or other supported currencies
      currency: "KES",
      description: "Test Payment",
      callback_url:
        "https://donation-app-umber.vercel.app/donate/payment-callback", // Your callback URL
      notification_id: "594d3029-3379-4ae8-9166-dc63188ccaa7", // Leave blank if you're not using IPN
      billing_address: {
        email: email,
        phone_number: phoneNumber,
        first_name: "Test",
        last_name: "User",
      },
    };

    const response = await axios.post(
      `https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest`,
      orderDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({ redirectUrl: response.data.redirect_url });
    //console.log(response.data.redirect_url);
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).send("Failed to initiate payment");
  }
};

export { pesapal };
