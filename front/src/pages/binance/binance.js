import axios from "axios";
import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { Menu } from "antd";
import MenuList from "../../components/menu";

function Binance() {
  const [amount, setAmount] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  const handlePayment = async () => {
    try {
      const response = await axios.post("create-order", {
        amount: amount,
        currency: "USDT",
        orderId: `order_${Date.now()}`,
      });
      if (response.data.status === "SUCCESS") {
        setPaymentUrl(response.data.data.checkoutUrl);
      } else {
        alert("Payment initiation failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error initiating payment");
    }
  };

  return (
    <>
      <MenuList />
      <div>
        <h2>Pay with Binance Pay</h2>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handlePayment}>Pay</button>
        {paymentUrl && (
          <div>
            <p>Click the link to complete payment:</p>
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
              Complete Payment
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default Binance;
