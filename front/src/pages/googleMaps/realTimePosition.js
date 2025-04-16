import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

function RealTimeTracking() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKdS460pbtW4C0g5FvKZ7gDWQJNT7Oz0s",
  });
  const [userPosition, setUserPosition] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!isLoaded || !userPosition.lat) return <div>Loading...</div>;

  return (
    <>
      <MenuList />
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={15}
        center={userPosition}
      >
        <Marker position={userPosition} />
      </GoogleMap>
    </>
  );
}

export default RealTimeTracking;
