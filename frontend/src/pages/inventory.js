"use client";

import React from "react";
import { useState } from "react";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Tomato",
      quantity: 100,
      last_updated: "November 8, 2024",
    },
    {
      id: 2,
      name: "Lettuce",
      quantity: 50,
      last_updated: "November 8, 2024",
    },
    {
      id: 3,
      name: "Onion",
      quantity: 70,
      last_updated: "November 8, 2024",
    },
    {
      id: 4,
      name: "Cheese",
      quantity: 30,
      last_updated: "November 8, 2024",
    },
    {
      id: 5,
      name: "Beef",
      quantity: 40,
      last_updated: "November 8, 2024",
    },
    {
      id: 6,
      name: "Chicken",
      quantity: 60,
      last_updated: "November 8, 2024",
    },
    {
      id: 7,
      name: "Bread",
      quantity: 80,
      last_updated: "November 8, 2024",
    },
    {
      id: 8,
      name: "Sauce",
      quantity: 90,
      last_updated: "November 8, 2024",
    },
  ]);

  const handleEdit = (id) => {
    // Handle edit action here
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id) => {
    // Handle delete action here
    console.log("Delete item with ID:", id);
  };

  return (
    <div className="flex-col p-[15px]">
      <div className="flex py-[10px] justify-between items-center">
        <div className="flex gap-x-[10px] items-center">
          <img
            className="h-[30px] w-[30px]"
            src="/assets/images/delivery.png"
          ></img>
          <h1 className="font-bold text-xl">Inventory Management</h1>
        </div>
      </div>

      <div className="flex">
        <div className=" w-[350px] border-r-[1px] shadow-l p-[20px] pr-[30px]">
          <div className="flex justify-between items-center">
            <h1 className="mb-[10px] text-gray-800 text-[26px]">Ball Papper</h1>
            <button className="items-center bg-red-200 border-red-500 px-[10px] border-[1px] flex rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[20px] h-[20px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
              Ask AI
            </button>
          </div>
          <div className="flex justify-between my-[10px]">
            <div>
              <h1 className="font-bold text-gray-600">Inventory:</h1>
              <p className="text-blue-500 font-bold">664 items</p>
            </div>
            <div>
              <h1 className="font-bold text-gray-600">Last Updated:</h1>
              <p className="">November 8, 2024</p>
            </div>
          </div>
          <div className="flex justify-center items-center my-[10px]">
            <span className="h-[10px] w-[10px] rounded-full bg-orange-400"></span>
            <p className="text-gray-600 ml-[10px]">Low Inventory</p>
          </div>
          <div className="flex justify-center items-center my-[10px]">
            <span className="h-[10px] w-[10px] rounded-full bg-red-600"></span>
            <p className="text-gray-600 ml-[10px]">Expired</p>
          </div>
          <div className="flex justify-center items-center my-[10px]">
            <span className="h-[10px] w-[10px] rounded-full bg-red-400"></span>
            <p className="text-gray-600 ml-[10px]">About to Expire</p>
          </div>

          <img
            className=" mx-auto h-[200px] w-[200px] mt-[60px] mb-[30px]"
            src="/assets/images/tomato.png"
          ></img>
          <div className="flex justify-center gap-x-[15px] my-[15px] items-center">
            <button className="text-red-500 font-bold p-[5px] border shadow-lg rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <h1 className="text-2xl">5 kg</h1>
            <button className="text-green-500 font-bold p-[5px] shadow-lg border rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[20px] h-[20px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center my-[30px]">
            <button className="w-[200PX] p-[10px] shadow-lg bg-blue-500 text-white rounded-full">
              Save Changes
            </button>
          </div>
        </div>

        <div className="min-w-[700px]">
          <div className="flex justify-between px-[20px] mb-[20px] items-center">
            <em className="font-bold text-gray-600 text-xl">Inventory List</em>
            <button className="px-[30px] shadow-lg py-[5px] border rounded-full">
              Add Item
            </button>
          </div>
          <div className="">
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2 text-start">Name</th>
                  <th className="px-4 py-2">Last Updated</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-200">
                    <td className="px-4 py-2 text-center">#{item.id}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-center">
                      {item.last_updated}
                    </td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="mr-2 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v.01M12 8v.01M12 16v.01M12 20v.01M19 11a7 7 0 10-14 0 7 7 0 0014 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
