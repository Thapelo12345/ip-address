import { useState, useRef, useEffect } from "react";
import arrowIcon from "./assets/icon-arrow.svg?url";
import CellInfo from "./components/cellInfo";
import Map from "./components/map";
import "./App.css";

function App() {
  const ipAddressRef = useRef("192.212.174.101");
  const latitudeRef = useRef(0.0);
  const longitudeRef = useRef(0.0);

  const [load, setLoad] = useState(true);
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("Brooklyn, NY 10001");
  const [time, setTime] = useState("-05:00");
  const [isp, setIsp] = useState("SpaceX Starlink");

  async function GetLocation(ip: string) {
    const ipRegex =
      /^(?:(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)|(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?::[0-9A-Fa-f]{1,4}){1,6}|:(?:(?::[0-9A-Fa-f]{1,4}){1,7}|:)|fe80:(?::[0-9A-Fa-f]{0,4}){0,4}%[0-9a-zA-Z]+|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}\d){0,1}\d)\.){3}(?:25[0-5]|(?:2[0-4]|1{0,1}\d){0,1}\d)|(?:[0-9A-Fa-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}\d){0,1}\d)\.){3}(?:25[0-5]|(?:2[0-4]|1{0,1}\d){0,1}\d)))$/;
    try {
      setLoad(true);
      if (!ipRegex.test(ip)) throw new Error("Invalid Address!.");

      const fetchResponse = await fetch(
        `https://ip-address-server-sandy.vercel.app/geo-data${ip}`,
        { method: "GET" },
      );

      if (!fetchResponse.ok) throw new Error("Failed to connect Server!.");

      const ipifyData = await fetchResponse.json();

      if (ipifyData.message !== "Geo Data Recieved successfuly")
        throw new Error(ipifyData.message);

      const geoData = ipifyData.geoData;
      ipAddressRef.current = ipAddress;

      const arear = geoData.location;
      setLocation(arear.region + ", " + arear.city + " " + arear.postalCode);
      setTime(arear.timezone);

      latitudeRef.current = arear.lat;
      longitudeRef.current = arear.lng;

      setIsp(geoData.isp);
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : "unknown server Error!.";
      alert(errMessage);
    } finally {
      setLoad(false);
    }
  } //end of get location function

  async function SettingDefaultData() {
    try {
      const getUserLocation = await fetch(
        "https://ip-address-server-sandy.vercel.app/api/location",
        { method: "GET" },
      );

      if (!getUserLocation.ok)
      throw new Error("Failed to connect with server!.");
      const firstAddress = await getUserLocation.json();

      if (!firstAddress.ip) throw new Error("Fail to get user Address!.");

      const finalRequest = await fetch(`http://ipwho.is/${firstAddress.ip}`, {
        method: "GET",
      });

      if (!finalRequest.ok) throw new Error("Failed to second Location!.");

      const defaultData = await finalRequest.json();

      ipAddressRef.current = defaultData.ip;
      latitudeRef.current = defaultData.latitude;
      longitudeRef.current = defaultData.longitude;
      setIsp(defaultData.connection.isp);
      setTime(defaultData.timezone.utc);
      setLocation(
        defaultData.city + ", " + defaultData.region + " " + defaultData.postal,
      );
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : "unknown server Error!.";
      alert(errMessage);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    if (!load) return;
    SettingDefaultData();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section
        className="relative z-10 m-0 flex flex-col items-center h-70 py-5"
        style={{backgroundImage: `url("/ip-address/images/pattern-bg-desktop.png")`}}
      >
        <h1 className="text-center mt-10 md:mt-0 text-white text-2xl mb-4">
          IP Address Tracker
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            GetLocation(ipAddress);
          }}
          className="flex flex-row gap-0 items-center"
        >
          <label htmlFor="ip-search" className="sr-only">IP address or domain</label>
          <input
            className="focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-white text-sm bg-white p-3 px-6 mb-2 rounded-tl-2xl md:w-96 rounded-bl-2xl cursor-pointer"
            type="text"
            value={ipAddress}
            placeholder="Search for any IP address or domain"
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button type="submit" className="cursor-pointer">
            <div className="block bg-black p-4 mb-2 m-0 rounded-tr-2xl rounded-br-2xl">
              <img src={arrowIcon} alt="arrow-icon" />
            </div>
          </button>
        </form>

        <CellInfo
          isLoading={load}
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
