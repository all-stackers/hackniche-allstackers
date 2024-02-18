import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;

  //today's date
  const today = new Date();
  // date formate in dd month, yyyy
  const date =
    today.getDate() +
    " " +
    today.toLocaleString("default", { month: "long" }) +
    ", " +
    today.getFullYear();

  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  const checkOrderStatus = () => {
    fetch(
      `https://hackniche-nsrl.onrender.com/getorderstatus2?order_id=${orderId}`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        if (result.data) {
          toast.success("Order Completed", {
            autoClose: 1000,
            onClose: () => router.push(`/user/review`),
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
    <div className="bg-[#f4f7fd] min-h-screen">
      <div className="bg-white shadow-md w-full px-[20px] pt-[50px] py-[20px]">
        <h1 className="w-full text-center text-xl">Order Summary</h1>
      </div>
      <div className="mt-[30px] px-[20px]">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center border border-green-700 rounded-[50%] bg-green-400 w-[130px] h-[130px]">
            <img
              className="ml-[10px] h-[70px]"
              src="/assets/images/receipt.png"
            ></img>
          </div>
          <h1 className="mt-[20px] mb-[10px] font-bold text-xl">
            Super! Your order has been confirmed
          </h1>
          <p className="font-light text-xl">It will be ready within</p>
          <p className="font-bold text-xl">25 min</p>
        </div>
        <div className="p-[20px] mt-[30px] rounded-lg bg-white">
          <p className="border-b-[1px] pb-[10px]">
            <span className="text-gray-600">ORDER NUMBER:</span> <br />{" "}
            <span className="font-bold">{orderId}</span>
          </p>
          <p className="pt-[10px]">
            <span className="text-gray-600">ORDER DATE:</span> <br />{" "}
            <span className="font-bold">{dateTime}</span>
          </p>
        </div>
        <button className="w-full mt-[130px] py-[10px] rounded-lg bg-blue-500 text-white text-[18px]">
          Go Back
        </button>
      </div>
      <ToastContainer className={"mt-[40px]"} />
    </div>
  );
};

export default OrderDetails;
