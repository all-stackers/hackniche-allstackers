// MapContainer.js
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = () => {
  // Define your Google Maps API key
  const apiKey = "AIzaSyD4U__ddSGVEOpQY-gdy1_x9d4NBGFzH04";

  // Define the center of the map
  const center = {
    lat: 37.7749, // latitude of your initial center
    lng: -122.4194, // longitude of your initial center
  };

  // Define an array of markers with their positions
  const markers = [
    {
      name: "Marker 1",
      position: { lat: 37.7749, lng: -122.4194 }, // position of Marker 1
    },
    // Add more markers as needed
  ];

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={14}
        center={center}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} title={marker.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
