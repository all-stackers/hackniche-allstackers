import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const foodName = "Farmhouse Pizza";
const foodPrice = 200;

const Success = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const checkOrderStatus = () => {
    fetch(`http://localhost:5000/getorderstatus?order_id=${orderId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        if (result.data) {
          toast.success("Order confirmed", {
            autoClose: 1000,
            onClose: () => router.push(`/user/order/details/${orderId}`),
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const interval = setInterval(checkOrderStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#f4f7fd] h-screen">
      <div className="bg-white shadow-md w-full px-[20px] pt-[50px] py-[20px]">
        <h1 className="font-bold">B.Tech Food Truck</h1>
      </div>
      <div className="pt-[20px] px-[20px]">
        <div className="bg-white rounded-lg">
          <div className="flex my-[10px] justify-between p-[10px]">
            <div>
              <h2 className="text-[18px]">{foodName}</h2>
              <p className="text-gray-400">New Hand Toast, Regular</p>
            </div>
            <div className="flex-col flex items-end">
              1 item
              <p className="text-[16px]">₹{foodPrice}</p>
            </div>
          </div>
          <div className="my-[10px] border-t-[2px] border-dotted min-w-[100px] min-h-[2px]"></div>
          <div className="p-[10px] flex gap-x-[10px]">
            <svg
              className="mt-[5px] w-[30px] h-[30px]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>
            <div className="w-full">
              <p>
                Total Bill <b></b>
              </p>
              <p className="text-gray-600">Incl. taxes and charges</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[16px]">₹{foodPrice}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-[30px] justify-center items-center">
          <h1 className="my-[10px] text-2xl">Waiting for Confirmation</h1>
          <span className="loader2"></span>
          <p className="text-gray-600">
            Your order will get confirmed by admin
          </p>
        </div>
        <button className="w-full mt-[200px] py-[10px] rounded-lg bg-red-500 text-white text-[18px]">
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Success;
