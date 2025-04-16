import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

const stripePrivateKey = process.env.STRIPE_PRIVATE_KEY;

const stripe = new Stripe(stripePrivateKey);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

const checkout = async (req, res) => {
  try {
    // console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "kes",
            product_data: { name: storeItem.name },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/success`, //${process.env.client_url}/checkout-success
      cancel_url: `http://localhost:3000/cancel`,
    });
    //console.log(session);
    res.send({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { checkout };
