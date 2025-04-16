import Stripe from "stripe";

const stripePublishableKey =
  "pk_test_51QUp1QRoGGQBGchc5pmWV10WUKOtbk7kGVVNoQJ3PUZ2ymHRaganbkULyWj5sa9yjkFUAeGpVulXEiNroBqn8FA000Z8lMjCbP";

const stripePrivateKey =
  "sk_test_51QUp1QRoGGQBGchcLbx8G2mqheA634XlRis7wjyWIb49yq8XsHigSosyOZLCxY7q9aIhha7ZpYKOtW5uFf8oIhFx00pVpSNjmw";

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
