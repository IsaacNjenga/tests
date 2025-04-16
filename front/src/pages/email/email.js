import React, { useState } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import MenuList from "../../components/menu";
function Email() {
  const [values, setValues] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(values);

    axios
      .post("/send-email", values)
      .then((res) => {
        if (res.data.success) {
          alert("Email sent successfully");
        } else {
          alert("Failed to send email");
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error sending email");
      });
  };

  return (
    <>
      <MenuList />
      <div>
        <h1>Email</h1>
        <form onSubmit={handleSubmit}>
          <label>To:</label>
          <input type="text" name="to" onChange={handleChange} />
          <label>Subject:</label>
          <input type="text" name="subject" onChange={handleChange} />
          <label>Text:</label>
          <input type="text" name="text" onChange={handleChange} />{" "}
          <label>Image URL:</label>
          <input type="text" name="imageUrl" onChange={handleChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default Email;
