import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

const events = [
  { id: 1, name: "Concert", type: "Music", lat: 37.774929, lng: -122.419418 },
  { id: 2, name: "Art Expo", type: "Art", lat: 37.784929, lng: -122.409418 },
  {
    id: 3,
    name: "Food Festival",
    type: "Food",
    lat: 37.764929,
    lng: -122.429418,
  },
];

function EventLocator() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKdS460pbtW4C0g5FvKZ7gDWQJNT7Oz0s",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MenuList />
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={13}
        center={{ lat: 37.774929, lng: -122.419418 }}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.lat, lng: event.lng }}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
        {selectedEvent && (
          <InfoWindow
            position={{ lat: selectedEvent.lat, lng: selectedEvent.lng }}
            onCloseClick={() => setSelectedEvent(null)}
          >
            <div>
              <h4>{selectedEvent.name}</h4>
              <p>Type: {selectedEvent.type}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default EventLocator;
