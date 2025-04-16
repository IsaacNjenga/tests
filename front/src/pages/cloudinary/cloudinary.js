import React, { useState } from "react";
import Navbar from "../../components/navbar.js";
import axios from "axios";
import MenuList from "../../components/menu.js";
function Cloudinary() {
  const preset_key = "first_time";
  const cloud_name = "dinsdfwod";
  const [image, setImage] = useState();

  const handleChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        { withCredentials: false }
      )
      .then((res) => {
        console.log("Upload Successful:", res.data);
        setImage(res.data.secure_url);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <MenuList />
      <div>
        Cloudinary
        <div>
          <form onSubmit={handleSubmit}>
            <input type="file" name="image" onChange={handleChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
        <div>
          <img src={image} alt="uploaded" style={{ width: "100px" }} />
        </div>
      </div>
    </>
  );
}

export default Cloudinary;
