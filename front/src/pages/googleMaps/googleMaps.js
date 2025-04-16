import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useLocation as useReactRouterLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

function GoogleMaps() {
  const reactRouterLocation = useReactRouterLocation();
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const params = new URLSearchParams(reactRouterLocation.search);
    const city = params.get("city");
    if (city) {
      console.log(city);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation not supported by this browser");
    }
  }, [reactRouterLocation.search]);

  const { isLoaded } = useJsApiLoader({googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MenuList />
      <div style={{ width: "100%", height: "100%" }}>
        {location.latitude && location.longitude ? (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p>Getting location...</p>
        )}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          zoom={18}
          center={{
            lat: location.latitude,
            lng: location.longitude,
          }}
        />
      </div>
    </>
  );
}

export default GoogleMaps;
