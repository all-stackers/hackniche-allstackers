import { useEffect, useState } from "react";

export default function MapContainer() {
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    // Retrieve stops from local storage
    const storedStops = localStorage.getItem("stops");

    // Check if stops exist in local storage
    if (storedStops) {
      const parsedStops = JSON.parse(storedStops);
      const waypoints = [];
      parsedStops?.forEach((stop) => {
        waypoints.push({
          location: { lat: stop.lat, lng: stop.lng },
          stopover: true,
        });
      });
      setStops(waypoints);
    }
  }, []);

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
  console.log(stops);
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      // Google Maps API hasn't loaded yet
      return;
    }

    //get the selected stops in the local storage

    const position = { lat: 19.115919, lng: 72.826065 };
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

    directionsService.route(
      {
        origin: position,
        destination: position,
        travelMode: window.google.maps.TravelMode.DRIVING,

        waypoints: stops,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }, [location]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
