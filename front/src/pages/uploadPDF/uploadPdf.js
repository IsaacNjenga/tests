import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuList from "../../components/menu";

function UploadPdf() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);

  const submitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const result = await axios.post("uploadFiles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const fetchUploads = async () => {
    try {
      const res = await axios.get("getUploads", {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        const fetchedUploads = res.data.results;
        setData(fetchedUploads);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const createOpenLink = (filePath, file) => {
    const url = `http://localhost:3001${filePath}`; // Change to your production URL in deployment
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        Open {file}
      </a>
    );
  };

  return (
    <>
      <MenuList />
      <div className="App">
        UploadPdf
        <form className="formStyle" onSubmit={submitFile}>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <br />
        <div>
          <h1>Uploaded pdf's</h1>
          <div>
            {data.map((pdf, index) => (
              <div key={pdf._id}>
                <p>{index + 1}.</p>
                <p>Title: {pdf.title}</p>
                <p>Pdf: {pdf.file}</p>
                {createOpenLink(pdf.filePath, pdf.file)}
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadPdf;
