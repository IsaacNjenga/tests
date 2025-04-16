import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

//const generateIPN = (req, res) => {};
const accessToken = async (req, res, next) => {
  const consumer_key = process.env.PESAPAL_CONSUMER_KEY;
  const consumer_secret = process.env.PESAPAL_CONSUMER_SECRET;

  try {
    const response = await axios.post(
      "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken",
      {
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Successful response
    req.token = response.data.token;
    next();
  } catch (error) {
    // Error handling
    console.error(
      "Error generating OAuth token:",
      error.response?.data || error.message
    );
    res.status(401).json({
      error: "Failed to authenticate with Pesapal",
      details: error.response?.data || error.message,
    });
  }
};

export { accessToken };
