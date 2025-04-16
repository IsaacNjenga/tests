import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

const properties = [
  {
    id: 1,
    name: "Luxury Villa",
    lat: 40.748817,
    lng: -73.985428,
    price: "$2M",
  },
  { id: 2, name: "Apartment", lat: 40.729517, lng: -73.998672, price: "$500K" },
  { id: 3, name: "Studio", lat: 40.741895, lng: -73.989308, price: "$350K" },
];

function RealEstateMap() {
  const { isLoaded } = useJsApiLoader({googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });
  const [selected, setSelected] = useState(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MenuList />
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={12}
        center={{ lat: 40.748817, lng: -73.985428 }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            onClick={() => setSelected(property)}
          />
        ))}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h4>{selected.name}</h4>
              <p>Price: {selected.price}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default RealEstateMap;
