import React from "react";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const foodName = "Farmhouse Pizza";
const foodPrice = 200;

const Order = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleOrderButton = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_name: "Jhenil Parihar",
      order_name: foodName,
      amount: foodPrice,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://hackniche-nsrl.onrender.com/orders", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.order_id);
        const orderId = result.data.order_id;
        setLoading(false);
        toast.success("Order place successfully", {
          autoClose: 1000,
          onClose: () => router.push(`/user/order/${orderId}`),
        });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="bg-[#f4f7fd] h-screen">
      <div className="bg-white shadow-md w-full px-[20px] pt-[50px] py-[20px]">
        <h1 className="font-bold">B.Tech Food Truck</h1>
      </div>
      <div className="p-[20px] my-[10px] ">
        <div className="bg-blue-200 p-[10px] rounded-[10px]">
          <p className="font-bold text-blue-500">
            🥳 You saved ₹100 on this order
          </p>
        </div>
        <div className="flex my-[20px] justify-between p-[10px]">
          <div>
            <h2 className="text-[18px]">{foodName}</h2>
            <p className="text-gray-400">New Hand Toast, Regular</p>
            <p className="text-blue-500">Edit</p>
          </div>
          <div className="flex-col flex items-end">
            <button className="my-[5px] rounded-[7px] bg-red-100 border-[1px] px-[10px] border-red-600">
              - 1 +
            </button>
            <p className="text-[16px]">₹{foodPrice}</p>
          </div>
        </div>
        <div className="my-[20px] p-[10px] bg-white rounded-lg">
          <div className="flex gap-x-[10px] items-center">
            <img className="w-[30px]" src="/assets/images/fast-time.png"></img>
            <p>
              Food will be prepared in <b>25-30 mins</b>
            </p>
          </div>
          <div className="my-[10px] border-t-[2px] border-dotted min-w-[100px] min-h-[2px]"></div>
          <div className="flex gap-x-[10px]">
            <svg
              className="mt-[5px] w-[30px] h-[30px]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>
            <div className="w-full">
              <p>
                Total Bill <b></b>
              </p>
              <p className="text-gray-600">Incl. taxes and charges</p>
            </div>
            <div>
              <p className="text-[16px]">₹{foodPrice}</p>
            </div>
          </div>
        </div>
        <p className="text-gray-600">CANCELLATION POLICY</p>
        <p className="text-[13px] text-gray-600 font-light">
          Help us reduce food waste by avoiding cancellations after placing your
          order. A 100% cancellation fee will be applies.
        </p>

        <button
          className="mt-[200px] w-full bg-red-400 py-[10px] border rounded-lg text-white text-[18px]"
          onClick={handleOrderButton}
        >
          {loading ? <ScaleLoader color="white" /> : "Order now"}
        </button>
      </div>

      <ToastContainer className={"mt-[40px]"} />
    </div>
  );
};

export default Order;
