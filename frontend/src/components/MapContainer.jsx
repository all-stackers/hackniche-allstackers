import { useEffect, useState } from "react";

export default function MapContainer() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Error retrieving location: ${err.message}`);
      }
    );
  }, []);

  const position = { lat: 19.115919, lng: 72.826065 };

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: position,
      zoom: 14,
    });

    // Optionally, add a marker
    new window.google.maps.Marker({
      position: position,
      map: map,
      title: "Your Location",
    });

    // Directions
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const position2 = { lat: 19.107138, lng: 72.837243 };

    directionsService.route(
      {
        origin: position,
        destination: position2,
        travelMode: window.google.maps.TravelMode.DRIVING,

        waypoints: [
          {
            location: { lat: 19.130626, lng: 72.822306 },
            stopover: true,
          },
        ],
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }, [position]);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
}
