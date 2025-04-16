import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar.js";
import MenuList from "../../components/menu.js";

function Mpesa() {
  const [values, setValues] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await axios
      .post("/stkpush", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        console.log(data);
        setMessage("Payment successful!");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Payment failed!");
      });
  };

  return (
    <>
      <MenuList />
      <div>
        <h1>Payment form</h1>
        {message && (
          <p style={{ color: message.includes("failed") ? "red" : "green" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "1400px",
              alignItems: "center",
            }}
          >
            <label htmlFor="number">Phone number</label>
            <input type="text" name="phoneNumber" onChange={handleChange} />
            <label htmlFor="acc_number">Account number</label>
            <input type="text" name="accountNumber" onChange={handleChange} />
            <label htmlFor="number">Amount</label>
            <input type="number" name="amount" onChange={handleChange} />
            <br />
            <button type="submit">Pay</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Mpesa;
