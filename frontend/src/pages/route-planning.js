import Ma from "@/components/MapContainer";
// import RouteWithWaypoints from "@/components/RouteWithWaypoints";
import MapContainer from "@/components/MapContainer";
import React, { useState } from "react";
import Head from "next/head";

const daily_stops = [
  {
    id: 1,
    name: "Mithibai College",
    lat: 19.1028,
    lng: 72.836744,
    stopover: true,
  },
  {
    id: 2,
    name: "Juhu Beach",
    lat: 19.107138,
    lng: 72.837243,
    stopover: true,
  },
  {
    id: 3,
    name: "ISKCON Temple",
    lat: 19.130626,
    lng: 72.822306,
    stopover: true,
  },
];

const recommended_stops = [
  {
    id: 4,
    name: "DN Nagar",
    lat: 19.127596,
    lng: 72.832057,
    stopover: true,
  },
  {
    id: 5,
    name: "Inifinity Mall",
    lat: 19.1287,
    lng: 72.8303,
    stopover: true,
  },
  {
    id: 6,
    name: "Bangur Nagar",
    lat: 19.167,
    lng: 72.832,
    stopover: true,
  },
];

const waste_collection_stops = [
  {
    id: 6,
    name: "Bangur Nagar",
    lat: 19.167,
    lng: 72.832,
    stopover: true,
  },
  {
    id: 7,
    name: "Rajendra Nagar",
    lat: 19.197,
    lng: 72.802,
    stopover: true,
  },
];

const RoutePlanning = () => {
  const [stopsSelected, setStopsSelected] = useState([]);
  const [page, setPage] = useState(0);

  const handleStopSelect = (id) => {
    const stop = daily_stops.find((stop) => stop.id === id);
    if (stop) {
      setStopsSelected([...stopsSelected, stop]);
    }
  };
  const handleRecommendedStopSelect = (id) => {
    const stop = recommended_stops.find((stop) => stop.id === id);
    if (stop) {
      setStopsSelected([...stopsSelected, stop]);
    }
  };
  const handleWasteCollectionStopSelect = (id) => {
    const stop = waste_collection_stops.find((stop) => stop.id === id);
    if (stop) {
      setStopsSelected([...stopsSelected, stop]);
    }
  };
  const handleGetRoutes = () => {
    //store the selected stops in the local storage
    localStorage.setItem("stops", JSON.stringify(stopsSelected));
    setPage(1);
  };
  return (
    <div>
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD4U__ddSGVEOpQY-gdy1_x9d4NBGFzH04&libraries=places`}
        ></script>
      </Head>
      <div className="flex">
        <div className="w-full">
          <div className="flex z-50	shadow-lg justify-between w-full p-[20px]">
            <div className="flex gap-x-[10px] items-center">
              <img
                className="h-[30px] w-[30px]"
                src="/assets/images/route.png"
              ></img>
              <h1 className="font-bold text-xl">Smart Route Planning</h1>
            </div>
            <button
              className="flex gap-x-[10px] items-center bg-blue-300 border-blue-500 border hover:bg-blue-400 py-[5px] px-[20px] rounded-[10px]"
              onClick={handleGetRoutes}
            >
              Get Routes
            </button>
          </div>
          {page === 0 ? (
            <div className="flex z-0 shadow-inner bg-gray-100">
              <div className="w-[50%] h-screen bg-white shadow-inner p-[20px]">
                <h1 className="font-bold">Waypoints and stops</h1>

                {stopsSelected.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 mt-[20px]">
                    {stopsSelected.map((stop) => (
                      <div
                        key={stop.id}
                        className="bg-white w-[100%] mx-auto shadow-md overflow-hidden"
                      >
                        <div className="flex items-center px-[20px] py-[10px]">
                          <div className="mr-[15px]">
                            <img
                              className="h-[30px]"
                              src="\assets\images\marker.png"
                              alt="PDF Icon"
                            ></img>
                          </div>
                          <div>
                            <h2 className="font-bold text-gray-700 text-[16px]">
                              {stop.name}
                            </h2>
                            <div className="flex gap-x-[15px]">
                              <p className="text-gray-600 text-[12px]">
                                Latitude: {stop.lat}
                              </p>
                              <p className="text-gray-600 text-[12px]">
                                Longitude: {stop.lng}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="w-full text-center italic mt-[50px] text-gray-600">
                    No Stops selected
                  </p>
                )}
              </div>
              <div className="p-[20px] overflow-y-auto scrollbar-hide h-[90vh] w-[60%]">
                <h1 className="text-xl mb-[20px] font-bold">
                  Select stop for today's route
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  <h1 className="font-bold">Daily Stops</h1>
                  {daily_stops.map((stop) => (
                    <div
                      key={stop.id}
                      className="bg-white w-[100%] mx-auto shadow-md overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-[20px] py-[10px]">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <img
                              className="h-[30px]"
                              src="\assets\images\location.png"
                              alt="PDF Icon"
                            ></img>
                          </div>
                          <div>
                            <h2 className="font-bold text-gray-700 text-[16px]">
                              {stop.name}
                            </h2>
                            <div className="flex gap-x-[15px]">
                              <p className="text-gray-600 text-[12px]">
                                Latitude: {stop.lat}
                              </p>
                              <p className="text-gray-600 text-[12px]">
                                Longitude: {stop.lng}
                              </p>
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          onChange={() => handleStopSelect(stop.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-[30px] grid grid-cols-1 gap-4">
                  <h1 className="font-bold">Recommend Stops</h1>
                  {recommended_stops.map((stop) => (
                    <div
                      key={stop.id}
                      className="bg-white w-[100%] mx-auto shadow-md scrollbar-hide overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-[20px] py-[10px]">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <img
                              className="h-[30px]"
                              src="\assets\images\dollar-symbol.png"
                              alt="Dollar Icon"
                            ></img>
                          </div>
                          <div>
                            <h2 className="font-bold text-gray-700 text-[16px]">
                              {stop.name}
                            </h2>
                            <div className="flex gap-x-[15px]">
                              <p className="text-gray-600 text-[12px]">
                                Latitude: {stop.lat}
                              </p>
                              <p className="text-gray-600 text-[12px]">
                                Longitude: {stop.lng}
                              </p>
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          onChange={() => handleRecommendedStopSelect(stop.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-[30px] grid grid-cols-1 gap-4">
                  <h1 className="font-bold">Waste Dumping Stops</h1>
                  {waste_collection_stops.map((stop) => (
                    <div
                      key={stop.id}
                      className="bg-white w-[100%] mx-auto shadow-md overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-[20px] py-[10px]">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <img
                              className="h-[30px]"
                              src="\assets\images\garbage.png"
                              alt="Dollar Icon"
                            ></img>
                          </div>
                          <div>
                            <h2 className="font-bold text-gray-700 text-[16px]">
                              {stop.name}
                            </h2>
                            <div className="flex gap-x-[15px]">
                              <p className="text-gray-600 text-[12px]">
                                Latitude: {stop.lat}
                              </p>
                              <p className="text-gray-600 text-[12px]">
                                Longitude: {stop.lng}
                              </p>
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleWasteCollectionStopSelect(stop.id)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-[500px]">
              <MapContainer waypoints={stopsSelected} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutePlanning;
