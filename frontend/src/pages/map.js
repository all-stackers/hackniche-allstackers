import MapWithMarkers from "@/components/MapWithMarker";
import React from "react";
import Head from "next/head";

const Map = () => {
  const positions = [
    [51.505, -0.09],
    [48.8566, 2.3522],
    [40.7128, -74.006],
    [34.0522, -118.2437],
  ];

  return (
    <div>
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD4U__ddSGVEOpQY-gdy1_x9d4NBGFzH04&libraries=places`}
        ></script>
      </Head>
      <div>
        <h1>Map with Multiple Markers</h1>
        <MapWithMarkers positions={positions} />
      </div>
    </div>
  );
};

export default Map;
