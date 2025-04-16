import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

function ReverseGeocodeMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKdS460pbtW4C0g5FvKZ7gDWQJNT7Oz0s",
  });
  const [address, setAddress] = useState("");
  const coordinates = { lat: -1.2206103, lng: 36.85534588 };

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: coordinates }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address); // Extract formatted address
        } else {
          console.error("Geocoding failed: ", status);
        }
      });
    }
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MenuList />
      <div>
        <h2>Reverse Geocoding</h2>
        <p>
          Coordinates: ({coordinates.lat}, {coordinates.lng})
        </p>
        <p>Address: {address || "Fetching address..."}</p>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          zoom={20}
          center={coordinates}
        />
      </div>
    </>
  );
}

export default ReverseGeocodeMap;
