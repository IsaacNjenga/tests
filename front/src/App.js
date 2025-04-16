//import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CustomMap from "./pages/googleMaps/customization";
import EventLocator from "./pages/googleMaps/eventLocator";
import FieldServiceMap from "./pages/googleMaps/fieldServices";
import GoogleMaps from "./pages/googleMaps/googleMaps";
import UploadPdf from "./pages/uploadPDF/uploadPdf";
//import axios from "axios";
//import ToDo from "./pages/jest/toDo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RealEstateMap from "./pages/googleMaps/realEstateMap";
import RealTimeTracking from "./pages/googleMaps/realTimePosition";
import ReverseGeocodeMap from "./pages/googleMaps/reverseGeocode";
import Mpesa from "./pages/mpesa/mpesa";
import axios from "axios";
import Stripe from "./pages/stripe/stripe";
import Cloudinary from "./pages/cloudinary/cloudinary";
import Success from "./pages/stripe/success";
import Cancel from "./pages/stripe/cancel";
import Paystack from "./pages/paystack/paystack";
import Pesapal from "./pages/pesapal/pesapal";
import Currency from "./pages/currency/currency";
import Email from "./pages/email/email";
import Intasend from "./pages/intasend/intasend";
import Dpo from "./pages/DPO/dpo";
import ChatContainer from "./pages/chats/chatContainer.js";
import AddRowTable from "./pages/addRowTable/addRowTable";
import Binance from "./pages/binance/binance";
import Chat from "./pages/websockets/chats";
import Buni from "./pages/buni/buni";
import Coinbase from "./pages/coinbase/coinbase";
import Pdfreader from "./pages/PDFReader/pdfreader";

axios.defaults.baseURL = "http://localhost:3001/back";
axios.defaults.withCredentials = true;

function App() {
  // const todos = [
  //   { id: 1, title: "wash dishes", completed: true },
  //   { id: 2, title: "make lunch", completed: false },
  // ];
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadPdf />} />
        </Routes>
      </BrowserRouter> */}
      {/* {todos.map((todo) => {
        return <ToDo todo={todo} />;
      })} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoogleMaps />} />
          <Route path="/customization" element={<CustomMap />} />
          <Route path="/event-locator" element={<EventLocator />} />
          <Route path="/field-services" element={<FieldServiceMap />} />
          <Route path="/real-estate" element={<RealEstateMap />} />
          <Route path="/real-time-position" element={<RealTimeTracking />} />
          <Route path="/reverse-geocode" element={<ReverseGeocodeMap />} />
          <Route path="/mpesa" element={<Mpesa />} />
          <Route path="/stripe" element={<Stripe />} />
          <Route path="/cloudinary" element={<Cloudinary />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/paystack" element={<Paystack />} />
          <Route path="/pesapal" element={<Pesapal />} />
          <Route path="/currency" element={<Currency />} />{" "}
          <Route path="/email" element={<Email />} />
          <Route path="/intasend" element={<Intasend />} />
          <Route path="/dpo" element={<Dpo />} />
          <Route path="/chats" element={<ChatContainer />} />
          <Route path="/table" element={<AddRowTable />} />{" "}
          <Route path="/upload" element={<UploadPdf />} />
          <Route path="/binance" element={<Binance />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/buni" element={<Buni />} />
          <Route path="/coinbase" element={<Coinbase />} />
          <Route path="/pdfreader" element={<Pdfreader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
