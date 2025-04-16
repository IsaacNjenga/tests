import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

function FieldServiceMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKdS460pbtW4C0g5FvKZ7gDWQJNT7Oz0s",
  });
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  const origin = { lat: 40.748817, lng: -73.985428 }; // Starting point
  const destination = { lat: 40.73061, lng: -73.935242 }; // Destination point

  const handleDirectionsCallback = (response, status) => {
    if (status === "OK") {
      setDirections(response);
    } else {
      console.error("Error fetching directions", status);
      setError("Could not fetch directions");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MenuList />
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={12}
        center={origin}
      >
        <DirectionsService
          options={{
            origin: origin,
            destination: destination,
            travelMode: "WALKING",
          }}
          callback={handleDirectionsCallback}
        />

        {directions && <DirectionsRenderer options={{ directions }} />}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </GoogleMap>
    </>
  );
}

export default FieldServiceMap;
