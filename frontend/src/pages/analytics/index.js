import React, { use, useEffect, useState } from "react";
import { Pie } from "./pie";
import BarGraph from "./bar";
import Map from "./map";
import Rating from "@mui/material/Rating";

import ChartComponent from "./linechart";

const MyComponent = () => {
  // State to store reviews
  const [data, setData] = useState([5000, 2000, 1700, 500]);
  const weekData = [10, 20, 15, 25, 30, 35, 20];
  const [count, setCount] = useState(3);
  const [label, setLabel] = useState(["sushi", "Ramen", "Mono", "egg"]);
  const [reviews, setReviews] = useState([]);
  const pieChartColors = [
    "#4C7CFF",
    "#FF6B6B",
    "#63B3ED",
    "#FFD166",
    "#A0D468",
    "#ED5565",
    "#48CFAD",
    "#AC92EB",
    "#FFCE54",
    "#6A6A6A",
    "#EC87C0",
    "#5DB2FF",
    "#FFD700",
    "#9F9F9F",
    "#37BC9B",
    "#967ADC",
    "#FF7857",
    "#5E5E5E",
    "#DA4453",
    "#80D3E6",
  ];

  const fetch_reviews = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/review", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.reverse());
        setReviews(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_reviews();
  }, []);

  return (
    <div className="flex bg-[#f4f7fd] w-full">
      <div className="flex flex-col p-[20px] gap-y-[20px]">
        <div className="flex w-full gap-x-[20px]">
          <div className="flex flex-col justify-center items-center p-[10px] bg-white rounded-[15px]">
            <h1 className="text-[#1b4788f8] font-bold mb-[20px]">
              Food Sales Distribution
            </h1>
            <Pie
              label={label}
              color={pieChartColors.slice(0, count + 1)}
              pieData={data}
            />
          </div>
          <div className="w-[400px] bg-white rounded-[15px] p-[20px] flex flex-col justify-center items-center">
            <h1 className="text-[#1b4788f8] font-bold mb-[40px]">
              Weekly Sales
            </h1>
            <BarGraph data={weekData} />
          </div>
          <div className="w-[400px] bg-white rounded-[15px] p-[20px] flex flex-col justify-center items-center">
            <h1 className="text-[#1b4788f8] font-bold mb-[30px]">
              Sales vs User
            </h1>
            <ChartComponent />

          </div>


        </div>
        <div className="flex w-full gap-x-[20px]">

          <div className="w-[750px] h-[400px] bg-white rounded-[15px] py-[10px]">
            <Map />
          </div>

          <div className="p-4 w-[340px] h-[400px] bg-white rounded-[15px] overflow-y-auto scrollbar-hide">
            {/* Review Section */}
            <h1 className="font-medium w-full text-center text-[18px] mb-[10px]">User Reviews</h1>
            <hr className="mb-[10px]" />
            <div className="review flex flex-col">
              {reviews.sort((a, b) => b.review_id - a.review_id).map((review) => (
                <div
                  key={review.review_id}
                  className="review-item border-b-[1px] border-gray-200 pb-[10px] mb-[20px]"
                >
                  <div className="flex justify-between">
                    <div className="reviewer-name font-bold">
                      {review.customer_name}
                    </div>
                    <div className="rating">
                      <Rating name="read-only" value={review.rating} readOnly />
                    </div>
                  </div>
                  <div className="review-description text-gray-600 text-sm">
                    {review.review}
                  </div>
                  <div className="reply-section mt-2">
                    <textarea
                      className="w-full border rounded-md p-2 text-sm"
                      placeholder="Admin Reply..."
                    ></textarea>
                    <button className="bg-blue-500 px-[20px] text-white py-1 text-[15px] mt-2 rounded-md">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default MyComponent;
