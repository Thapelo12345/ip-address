import React, { useEffect, useMemo } from 'react';
import markerIcon from "../assets/icon-location.svg?url";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type PROPS = {
  Latitude: number;
  Longitude: number;
};

const customSvgIcon = L.icon({
  iconUrl: markerIcon, // Now it is correctly recognized as a string
  iconSize: [24, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function FollowMarker({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [map, position]);

  return null;
}

export default function Map({ Latitude, Longitude }: PROPS) {
  const position = useMemo<[number, number]>(
    () => (Latitude === 0 && Longitude === 0 ? [51.505, -0.09] : [Latitude, Longitude]),
    [Latitude, Longitude],
  );

  return (
    <div className='relative z-0 h-full'>
      <MapContainer
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
      >
        <FollowMarker position={position} />
        {/* OpenStreetMap public tiles layer */}
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Adds a point marker at our coordinates */}
        <Marker  position={position} icon={customSvgIcon} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
