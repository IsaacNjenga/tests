import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

function Pesapal() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(values);
    await axios
      .post("initiate-payment", values)
      .then((res) => {
        setLoading(false);
        console.log(res);
        const url = res.data.redirectUrl;
        window.location.href = url;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <MenuList /> <div>Pesapal</div>
      {loading && <p>Loading</p>}
      <div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" onChange={handleChange} name="email" />
          <label>PhoneNumber</label>
          <input type="number" onChange={handleChange} name="phoneNumber" />
          <label>Amount</label>
          <input type="number" onChange={handleChange} name="amount" />
          <button type="submit">Checkout</button>
        </form>
      </div>
    </>
  );
}

export default Pesapal;
