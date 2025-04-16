import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./success.css";
import { format } from "date-fns";
import MenuList from "../../components/menu";

function Success() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [debouncedReference, setDebouncedReference] = useState(reference);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedReference(reference);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [reference]);

  const getVerification = async () => {
    try {
      const response = await axios.get(`verify-payment?reference=${reference}`);
      if (response.data && response.data.success) {
        const responseData = response.data.responseData;
        setResponse(responseData);
      } else {
        console.log("Error:", response.data);
        setError("Failed to verify payment");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Failed to verify payment");
    }
  };

  useEffect(() => {
    if (debouncedReference) {
      getVerification();
    }
  }, [debouncedReference]);

  return (
    <>
      <MenuList />
      <div>
        <h1>Success</h1>
        {reference && (
          <div className="transaction-details">
            <h3 className="reference-number">
              Your reference number is {reference}
            </h3>
            <h2 className="transaction-header">Transaction details</h2>
            {response ? (
              <div className="transaction-info">
                {response.data ? (
                  <>
                    <p className="transaction-data">
                      <span className="label">Amount:</span> Ksh.
                      {response.data.amount / 100 || "N/A"}
                    </p>
                    <p className="transaction-data">
                      <span className="label">Bank:</span>{" "}
                      {response.data.authorization?.bank || "N/A"}
                    </p>
                    <p className="transaction-data">
                      <span className="label">Brand:</span>{" "}
                      {response.data.authorization?.brand || "N/A"}
                    </p>
                    <p className="transaction-data">
                      <span className="label">Card Type:</span>{" "}
                      {response.data.authorization?.card_type || "N/A"}
                    </p>
                    <p className="transaction-data">
                      <span className="label">Country Code:</span>{" "}
                      {response.data.authorization?.country_code || "N/A"}
                    </p>
                    <p className="transaction-data">
                      <span className="label">Created At:</span>{" "}
                      {format(new Date(response.data.created_at), "PPPP") ||
                        "N/A"}
                    </p>
                    <p className="transaction-data">
                      <span className="label">Email:</span>{" "}
                      {response.data.customer?.email || "N/A"}
                    </p>
                    <p className="transaction-data">
                      <span className="label">Message:</span>{" "}
                      {response.message || "N/A"}
                    </p>
                  </>
                ) : (
                  <p>No transaction data found.</p>
                )}
              </div>
            ) : (
              <p>{error || "Loading..."}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Success;
