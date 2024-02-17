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
          <h1 className="mb-[10px] text-gray-800 text-[26px]">Ball Papper</h1>
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
          <img
            className=" mx-auto h-[200px] w-[200px] my-[10px]"
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

        <div className="px-[10px] w-[700px]">
          <div className="flex justify-between">
            <h1 className="font-bold">Inventory List</h1>
            <button className="px-[30px] shadow-lg py-[5px] border rounded-full">
              Add Item
            </button>
          </div>
          <div className="">
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {inventoryItems.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">{item.last_updated}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="mr-[10px]"
                      >
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className=""
                      >
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
