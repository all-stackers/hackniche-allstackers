import React, { useState } from 'react';

const RestaurantMenu = () => {
    const [menuDetails, setMenuDetails] = useState({
        dishName: 'Spaghetti Carbonara',
        dishImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDOsOFTIwtN2EqanQd8_D9HqtnyuSwLo50g&usqp=CAU', // Placeholder image
        price: '10.99',
        description: 'Delicious spaghetti with creamy sauce',
        category: ["jain", "veg"],
        healthMetrics: {
            calories: '200',
            protein: '20g',
            fat: '30',
            carbs: '100'
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [field, subField] = name.split('.');
            setMenuDetails(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subField]: value
                }
            }));
        } else {
            setMenuDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSave = () => {
        // Logic to save menu details
        console.log(menuDetails);
    };

    return (
        <div className="flex h-screen w-full">
            {/* Section 1 */}
            <div className="w-[40%] flex flex-col items-center justify-center bg-gray-100 p-8">
                <h2 className="text-3xl mb-8 text-[#285dc6]">Menu</h2>
                <div className="w-60% h-60 bg-gray-200 mb-4">
                    <img src={menuDetails.dishImage} alt={menuDetails.dishName} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl mb-2">{menuDetails.dishName}</h3>
                <p className="mb-2">Price: {menuDetails.price}</p>
                <button className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-md" onClick={handleSave}>Save</button>
            </div>
            {/* Section 2 */}
            <div className="w-[60%]  p-8">
                <h2 className="text-3xl mb-4 text-[#285dc6]">Food Details</h2>
                <div className="mb-4">
                    <h3 className="text-lg mb-2">Description</h3>
                    <textarea
                        name="description"
                        value={menuDetails.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full p-2 border border-[#96b6f4] rounded-md mb-2"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-lg mb-2">Category</h3>
                    <div className="flex flex-wrap">
                        {menuDetails.category.map((category, index) => (
                            <div
                                key={index}
                                className="bg-blue-200 rounded-md py-2 px-4 mr-2 mb-2"
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg mb-2">Health Metrics</h3>
                    <div className="flex flex-wrap">
                        {Object.entries(menuDetails.healthMetrics).map(([key, value]) => (
                            <div className="mb-2 mr-4" key={key}>
                                <p className="text-sm font-semibold mb-1">{key}</p>
                                <input
                                    type="text"
                                    name={`healthMetrics.${key}`}
                                    value={value}
                                    onChange={handleChange}
                                    className="w-20 bg-white border rounded-md p-2 border-[#96b6f4]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="bg-[#285dc6] hover:bg-blue-400 text-white px-4 py-2 rounded-md" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default RestaurantMenu;
