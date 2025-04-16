import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "../../components/navbar";
import MenuList from "../../components/menu";

const mapStyles = [
  { featureType: "water", stylers: [{ color: "#0e0d47" }] },
  { featureType: "road", stylers: [{ visibility: "simplified" }] },
  { featureType: "landscape", stylers: [{ color: "#f2f2f2" }] },
];

function CustomMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MenuList />
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={12}
        center={{ lat: -1.2812288, lng: 36.78208 }}
        options={{ styles: mapStyles }}
      />
    </>
  );
}

export default CustomMap;
