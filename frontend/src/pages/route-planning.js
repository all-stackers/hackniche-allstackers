import RouteWithWaypoints from "@/components/MapContainer";
import React from "react";

const RoutePlanning = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-full">
          <h1 className="px-[20px] py-[10px] text-xl">Smart Route Planning</h1>
          <div className="w-full bg-gray-100 h-screen my-[10px]">
            {/* <RouteWithWaypoints /> */}
          </div>
        </div>
        <div className="shadow-l w-[350px] border-l px-[10px] py-[10px]">
          Side Bar
        </div>
      </div>
    </div>
  );
};

export default RoutePlanning;
