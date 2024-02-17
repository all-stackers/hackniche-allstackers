import React, { use, useEffect, useState } from 'react';
import { Pie } from './pie';
import BarGraph from './bar';
import Map from './map';
import Rating from '@mui/material/Rating';

const MyComponent = () => {
  // State to store reviews
  const [data, setData] = useState([5000, 2000, 1700, 500]);
  const weekData = [10, 20, 15, 25, 30, 35, 20];
  const [count, setCount] = useState(3);
  const [label, setLabel] = useState([
    "sushi",
    "Ramen",
    "Mono",
    "egg",
  ]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'John Doe',
      rating: '⭐⭐⭐⭐',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: '⭐⭐⭐',
      description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    {
        id: 3,
        name: 'John Doe',
        rating: '⭐⭐⭐⭐',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
      },
      {
        id: 4,
        name: 'Jane Smith',
        rating: '⭐⭐⭐',
        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
    // Add more reviews as needed
  ]);
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
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:5000/review", requestOptions)
      .then(response => response.json())
      .then(result => {
        setReviews(result.data)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetch_reviews();
  }, []);


  return (
    <div className="flex  p-4 h-screen w-full">
      <div className="section1 flex flex-col w-[70%]  p-4">
        <div className="sub-section1 flex h-1/2 w-[100%]">
          <div className=" relative sub-section1a w-[40%] ">
          <Pie
              label={label}
              color={pieChartColors.slice(0, count + 1)}
              pieData={data}
            />
            <h1 className='absolute top-[-25px] left-[30%] text-[#1b4788f8]'>Dish Statistics</h1>
          </div>
          <div className="sub-section1b w-[60%] ">
          <BarGraph data={weekData} />
          </div>
        </div>
        <div className="sub-section2 w-[100%] h-1/2 ">
            <Map />
        </div>
      </div>
      <div className="section2 w-[30%] p-4 overflow-hidden overflow-y-scroll">
        {/* Review Section */}
        <h1 className='font-medium text-[18px] mb-[10px]'>User Reviews</h1>
        <hr className='mb-[10px]'/>
        <div className="review flex flex-col ">
          {reviews.map((review) => (
            <div key={review.review_id} className="review-item border-b-2 border-gray-400 py-2">
              <div className="flex justify-between">
                <div className="reviewer-name font-bold">{review.customer_name}</div>
                <div className="rating">
                  {/* print the rating * star */}
                  {/* {review.rating */}
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
                <button className="bg-blue-500 text-white px-2 py-1 text-[15px] mt-2 rounded-md">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
