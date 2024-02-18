import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "Mahaveer Nagar",
    position: { lat: 19.212066396963568, lng: 72.84151656266168 },
    high_sold: ["Biryani", "Vada Pav", "Pani Puri"],
    date: "2023-10-15",
  },
  {
    id: 2,
    name: "Andheri",
    position: { lat: 19.12022601251796, lng: 72.8469948770579 },
    high_sold: ["Pizza", "Burger", "Kebab"],
    date: "2023-11-20",
  },
  {
    id: 3,
    name: "Bangur Nagar",
    position: { lat: 19.165443583372745, lng: 72.84226215809923 },
    high_sold: ["Samosa", "Chaat", "Dosa"],
    date: "2023-12-25",
  },
  {
    id: 4,
    name: "Juhu Beach",
    position: { lat: 19.089259281052314, lng: 72.83572332641313 },
    high_sold: ["Biryani", "Vada Pav", "Pani Puri"],
    date: "2023-10-15",
  },
  {
    id: 5,
    name: "Nariman point",
    position: { lat: 18.924160146679263, lng: 72.82452142095832 },
    high_sold: ["Pizza", "Burger", "Kebab"],
    date: "2023-11-20",
  },
  {
    id: 6,
    name: "Thunga Malad",
    position: { lat: 19.18646677012782, lng: 72.88037578986679 },
    high_sold: ["Samosa", "Chaat", "Dosa"],
    date: "2023-12-25",
  },
];

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD4U__ddSGVEOpQY-gdy1_x9d4NBGFzH04",
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      <div className="container h-[100%]">
        <h1 className="text-center font-bold mb-[10px] text-[#2f5e9b]">
          Sales History from location Perspective
        </h1>
        <div className="h-[340px] w-full rounded-lg">
          {isLoaded ? (
            <GoogleMap
              center={{ lat: 19.18646677012782, lng: 72.88037578986679 }}
              zoom={10}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {markers.map(({ id, name, position, high_sold, date }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  icon={{
                    url:
                      activeMarker === id
                        ? "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png"
                        : "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
                    scaledSize: { width: 40, height: 40 },
                  }}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <p className=" text-[#2f5e9b] text-[15px] font-bold mb-[10px]">
                          {name}
                        </p>
                        <p className="mb-[5px] font-medium">Date: {date}</p>

                        <p className="mb-[5px] font-medium">
                          Highly Sold: {high_sold.join(", ")}
                        </p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default Map;
