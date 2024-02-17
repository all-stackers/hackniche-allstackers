import React, { useState, useEffect } from 'react';

const FoodCard = ({ food }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md m-4">
      <img src={food.photos[0]} alt={food.food_name} className="w-full h-36 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{food.food_name}</h2>
        <p className="text-gray-700 mb-4">{food.description}</p>
        <p className="text-gray-800 font-semibold">${food.price}</p>
      </div>
    </div>
  );
};

const FoodCardList = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu?mobile_number=9137357003");
        const data = await response.json();
        setFoodData(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {foodData.map(food => (
        <FoodCard key={food.food_name} food={food} />
      ))}
    </div>
  );
};

export default FoodCardList;
