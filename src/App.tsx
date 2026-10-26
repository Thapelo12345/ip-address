import { useState, useRef } from "react";
import arrowIcon from "./assets/icon-arrow.svg?url";
import CellInfo from "./components/cellInfo";
import Map from "./components/map";
import "./App.css";

function App() {
  const ipAddressRef = useRef("192.212.174.101");
  const latitudeRef = useRef(0.0);
  const longitudeRef = useRef(0.0);

  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("Brooklyn, NY 10001");
  const [time, setTime] = useState("-05:00");
  const [isp, setIsp] = useState("SpaceX Starlink");

  async function GetLocation(ip: string) {

    try{
    const fetchResponse = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IP_Geolocation_API}&ipAddress=${ip}`,
      { method: "GET" },
    );

    if(!fetchResponse.ok) throw new Error("Failed to connect Server!.")

    const ipifyData = await fetchResponse.json();
    ipAddressRef.current = ipAddress;

    const arear = ipifyData.location;
    setLocation(arear.region + ", " + arear.city + " " + arear.postalCode);
    setTime(arear.timezone);

    latitudeRef.current = arear.lat;
    longitudeRef.current = arear.lng;

    setIsp(ipifyData.isp);
  }catch(err: unknown){
    const errMessage = err instanceof Error ? err.message : "unknown server Error!."
    alert(errMessage)
  }

  } //end of get location function

  return (
    <div className="overflow-x-hidden">
      <section
        className="relative z-10 m-0 flex flex-col items-center h-70 py-5"
        style={{
          // backgroundImage: `url("../public/images/pattern-bg-desktop.png")`,
          backgroundImage: `url("/ip-address/images/pattern-bg-desktop.png")`,
        }}
      >
        <h1 className="text-center mt-10 md:mt-0 text-white text-2xl mb-4">
          IP Address Tracker
        </h1>

        <div className="flex flex-row gap-0 items-center">
          <input
            className="focus:outline-none text-sm bg-white p-3 px-6 mb-2 rounded-tl-2xl md:w-96 rounded-bl-2xl cursor-pointer"
            type="text"
            value={ipAddress}
            placeholder="Search for any IP address or domain"
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button
            className="cursor-pointer"
            onClick={() => GetLocation(ipAddress)}
          >
            <div className="block bg-black p-4 mb-2 m-0 rounded-tr-2xl rounded-br-2xl">
              {/* <img src="../src/assets/icon-arrow.svg" alt="arrow-icon" /> */}
              <img src={arrowIcon} alt="arrow-icon" />
            </div>
          </button>
        </div>

        <CellInfo
          ipAddress={ipAddressRef.current}
          location={location}
          time={time}
          isp={isp}
        />
      </section>

      <section className="w-full h-screen bg-blue-200">
        <Map Latitude={latitudeRef.current} Longitude={longitudeRef.current} />
      </section>
    </div>
  );
}

export default App;
