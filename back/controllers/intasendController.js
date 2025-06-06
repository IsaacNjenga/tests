import IntaSend from "intasend-node";
import dotenv from "dotenv";

dotenv.config();
const apipublishablekey = process.env.INTASEND_PUBLISHABLE_KEY;
const apisecretkey = process.env.INTASEND_API_SECRET_KEY;

let intasend = new IntaSend(apipublishablekey, apisecretkey, true);

//const IntaSend = require("IntaSend");

const makePayment = async (req, res) => {
  const { first_name, last_name, email, amount } = req.body;
  const formattedAmount = parseFloat(amount).toFixed(2);

  try {
    let collection = intasend.collection();
    collection
      .charge({
        first_name: first_name,
        last_name: last_name,
        email: email,
        host: "",
        amount: formattedAmount,
        currency: "USD",
        api_ref: "test",
        redirect_url: "http://localhost:3000/success",
      })
      .then((resp) => {
        //console.log("Charge response:", resp);
        //      console.log("url:", resp.url);
        const url = resp.url;
        res.status(200).json({ resp, url });
      })
      .catch((err) => {
        console.log("Charge error:", err);
      });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const invoice = async (req, res) => {
  let collection = intasend.collection();

  collection
    .status("YVOL6VQ")
    .then((resp) => {
      console.log("status resp:", resp);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { makePayment, invoice };
