"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("1");
  const router = useRouter()

  const handleEdit = (id) => {
    // Handle edit action here
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id) => {
    // Handle delete action here
    console.log("Delete item with ID:", id);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.id);
  };

  const fetch_inventory = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:5000/foodtruck?mobile_number=9137357003", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setInventoryItems(result.data.inventory);
      })
      .catch(error => console.log('error', error));
  }

  const handleIcrement = () => {
    let index = inventoryItems.findIndex(item => item.id == selectedItem);
    let item = inventoryItems[index];

    let quantity = item.quantity.split(" ")[0];
    let text = item.quantity.split(" ")[1];

    quantity = parseInt(quantity) + 1;

    item.quantity = `${quantity} ${text}`;

    let newInventoryItems = [...inventoryItems];
    newInventoryItems[index] = item;

    setInventoryItems(newInventoryItems);
  };

  const handleDecrement = () => {
    let index = inventoryItems.findIndex(item => item.id == selectedItem);
    let item = inventoryItems[index];

    let quantity = item.quantity.split(" ")[0];
    let text = item.quantity.split(" ")[1];

    quantity = parseInt(quantity);
    if (quantity > 0) {
      quantity = quantity - 1;
    }

    item.quantity = `${quantity} ${text}`;

    let newInventoryItems = [...inventoryItems];
    newInventoryItems[index] = item;

    setInventoryItems(newInventoryItems);
  };

  const handleSave = () => {
    const id = selectedItem;
    const quantity = inventoryItems.find(item => item.id == id).quantity;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "mobile_number": "9137357003",
      "id": id,
      "quantity": quantity
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/updateInventory", requestOptions)
      .then(response => response.text())
      .then(result => {
        toast.success('Inventory updated successfully', {
          autoClose: 1000,
        });
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    fetch_inventory();
  }, []);

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
        {inventoryItems.length > 1 && <div className=" w-[450px] border-r-[1px] shadow-l p-[20px] pr-[30px]">
          <div className="flex justify-between items-center">
            <h1 className="mb-[10px] text-gray-800 text-[26px]">{inventoryItems.find(item => item.id == selectedItem).name}</h1>
            <button 
            className="items-center bg-red-200 border-red-500 px-[10px] border-[1px] flex rounded-full"
            onClick={()=>{router.push('https://blinkit.com/s/?q='+inventoryItems.find(item => item.id == selectedItem).name)}}>
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
              Blink It
            </button>
          </div>
          <div className="flex justify-between my-[10px]">
            <div>
              <h1 className="font-bold text-gray-600">Inventory:</h1>
              <p className="text-blue-500 font-bold">
                {/* get the selected item and find the item in the inventory items */}
                {inventoryItems.find(item => item.id == selectedItem).quantity}
              </p>
            </div>
            {/* access the selected item from the inventory item */}

            
            <div>
              <h1 className="font-bold text-gray-600">Last Updated:</h1>
              <p className="">{inventoryItems.find(item => item.id == selectedItem).last_updated}</p>
            </div>
          </div>

          {/* <div className="flex justify-center items-center my-[10px]">
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
          </div> */}

          <img
            className=" mx-auto h-[200px] w-[200px] mt-[60px] mb-[30px]"
            src={inventoryItems.find(item => item.id == selectedItem).photo}
          ></img>
          <div className="flex justify-center gap-x-[15px] my-[15px] items-center">
            <button className="text-red-500 font-bold p-[5px] border shadow-lg rounded-full" onClick={handleDecrement}>
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
            <h1 className="text-2xl">{inventoryItems.find(item => item.id == selectedItem).quantity}</h1>
            <button className="text-green-500 font-bold p-[5px] shadow-lg border rounded-full" onClick={handleIcrement}>
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
            <button className="w-[200PX] p-[10px] shadow-lg bg-blue-500 text-white rounded-full" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>}

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
                  <tr key={item.id} className={`border-b cursor-pointer ${selectedItem == item.id ? "bg-purple-bg" : ""}`} onClick={() => handleItemClick(item)}>
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
      <ToastContainer />
    </div>
  );
};

export default Inventory;
