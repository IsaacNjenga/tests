import React, { useState } from "react";
import Navbar from "../../components/navbar";
import "intasend-inlinejs-sdk";
import axios from "axios";
import MenuList from "../../components/menu";

const apipublishablekey = "ISPubKey_test_f8621b63-7760-4606-ba57-c5a64dc28d64";
//apisecretkey:ISSecretKey_test_d97a89b2-d3fb-451a-94e8-058da7124939
function Intasend() {
  const [values, setValues] = useState([]);

  const clickedButton = () => {
    console.log("clicked");
    new window.IntaSend({ publicAPIKey: apipublishablekey, live: false })
      .on("COMPLETE", (response) => {
        console.log("COMPLETE:", response);
      })
      .on("FAILED", (response) => {
        console.log("FAILED", response);
      })
      .on("IN-PROGRESS", () => {
        console.log("INPROGRESS ...");
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("intasend-payment", values);
    //console.log(response.data);
    const { url } = response.data;

    // console.log(url);
    window.location.href = url;
  };

  const getInvoice = async () => {
    const response = await axios.get("get-invoice");
    console.log(response.data);
  };

  return (
    <>
      <MenuList />
      <div>
        <h1>Intasend</h1>
        <form onSubmit={handleSubmit}>
          <label>First name</label>
          <input type="text" name="first_name" onChange={handleChange} />
          <label>Last name</label>{" "}
          <input type="text" name="last_name" onChange={handleChange} />
          <label>Email</label>{" "}
          <input type="email" name="email" onChange={handleChange} />
          <label>Amount</label>{" "}
          <input type="number" name="amount" onChange={handleChange} />
          <br />
          <button
            type="submit "
            style={{
              background: "#2cc1ee",
              borderRadius: 3,
              border: "1px solid #2cc1ee",
              color: "#fff",
              height: 34,
            }}
          >
            Pay with backend
          </button>
        </form>
        <br />
        <div>
          {" "}
          <button
            title="pay now"
            className="intaSendPayButton"
            data-amount="10"
            data-currency="KES"
            onClick={clickedButton}
            style={{
              background: "#2cc1ee",
              borderRadius: 3,
              border: "1px solid #2cc1ee",
              color: "#fff",
              height: 34,
            }}
          >
            Pay Now using frontend
          </button>
        </div>
        <br />
        <button
          style={{
            background: "#2cc1ee",
            borderRadius: 3,
            border: "1px solid #2cc1ee",
            color: "#fff",
            height: 34,
          }}
          onClick={getInvoice}
        >
          Get Status
        </button>
      </div>
    </>
  );
}

export default Intasend;
