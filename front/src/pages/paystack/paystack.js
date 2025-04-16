import React, { useState } from "react";
import Navbar from "../../components/navbar";
import PaystackPop from "@paystack/inline-js";
import axios from "axios";
import toast from "react-hot-toast";
import MenuList from "../../components/menu";

function Paystack() {
  const [values, setValues] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const paystackPublicKey = "pk_test_5954fb8cfd4d597dae97ab640cbfda832f2d2b0c";

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.amount) {
      alert("Please provide a valid email and amount.");
      return;
    }
    if (isNaN(values.amount)) {
      alert("Amount must be a number.");
      return;
    }

    const response = await axios.post("initialize-payment", values);
    console.log(response.data);
    if (response.data.success) {
      toast.success("Successful");
      const url = response.data.responseData.data.authorization_url;
      console.log("url:", url);
      window.location.href = url;
    }

    // setIsProcessing(true);

    // const paystack = new PaystackPop();
    // paystack.newTransaction({
    //   key: paystackPublicKey,
    //   amount: values.amount * 100,
    //   email: values.email,
    //   onSuccess(transaction) {
    //     setIsProcessing(false);
    //     alert(`Payment verified and successful! ${transaction.reference}`);
    //     fetch(`verify-payment?reference=${transaction.reference}`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ reference: transaction.reference }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data.status === "success") {
    //           alert("Payment verified and successful!");
    //         } else {
    //           alert("Payment verification failed!");
    //         }
    //         setIsProcessing(false);
    //       });
    //   },
    //   onCancel() {
    //     alert("Transaction canceled");
    //     setIsProcessing(false);
    //   },
    // });
  };

  return (
    <>
      <MenuList />
      <div>
        <h1>Paystack</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" onChange={handleChange} name="email" required />
          <label>Amount</label>
          <input type="number" onChange={handleChange} name="amount" required />
          <div>
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Checkout"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Paystack;
