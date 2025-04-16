import React from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import MenuList from "../../components/menu";
function Stripe() {
  const items = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 1 },
  ];

  const checkOut = () => {
    axios
      .post("create-checkout-session", { items })
      .then((res) => {
        console.log(res.data);
        const url = res.data.url;
        window.location.href = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <MenuList />
      <div>
        <button onClick={checkOut}>Checkout</button>
      </div>
    </>
  );
}

export default Stripe;
