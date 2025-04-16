import coinbase from "coinbase-commerce-node";
import dotenv from "dotenv";

const { Client, resources } = coinbase;
dotenv.config();
// const Client = coinbase.Client;
// const resources = coinbase.resources;

const apiKey = process.env.COINBASE_API_KEY;

if (!apiKey) {
  throw new Error(
    "COINBASE_API_KEY is not defined in the environment variables."
  );
}

Client.init(apiKey);

const coinbaseCheckout = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Amount and currency are required." });
  }

  try {
    const charge = await resources.Charge.create({
      name: "Test Charge",
      description: "Test Charge Description",
      local_price: { amount, currency },
      pricing_type: "fixed_price",
      metadata: { user_id: "3434" },
    });

    console.log("Charge created successfully:", charge);
    res.status(200).json({ charge });
  } catch (error) {
    console.error(
      "Error creating charge:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while creating the charge." });
  }
};

export { coinbaseCheckout };
