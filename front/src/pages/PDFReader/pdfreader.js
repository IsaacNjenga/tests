import React, { useState } from "react";
import MenuList from "../../components/menu.js";
import axios from "axios";
function Pdfreader() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      console.log(formData);
      // const res = await axios.post("summarize", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // setSummary(res.data.summary);
    } catch (err) {
      console.error("Error uploading PDF:", err);
      setSummary("Failed to process PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MenuList />
      <h1>PDF-READER</h1>
      <form onSubmit={handleSubmit}>
        <label>Add a file</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!file || loading}>
          {loading ? "Processing..." : "Generate Summary"}
        </button>
      </form>
      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </>
  );
}

export default Pdfreader;
