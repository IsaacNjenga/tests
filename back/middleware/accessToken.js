import axios from "axios";
const ipnId = "594d3029-3379-4ae8-9166-dc63188ccaa7";
//const generateIPN = (req, res) => {};
const accessToken = async (req, res, next) => {
  const consumer_key = "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW";
  const consumer_secret = "osGQ364R49cXKeOYSpaOnT++rHs=";

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
