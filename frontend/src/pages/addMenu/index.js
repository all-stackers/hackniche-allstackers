import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
const axios = require('axios');
import { useRouter } from 'next/router'

const RestaurantMenu = () => {
    const router = useRouter()
    const [menuDetails, setMenuDetails] = useState({
        dishName: 'Spaghetti Carbonara',
        dishImage: '', // Placeholder image
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
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newCategory, setNewCategory] = useState('');

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleUpload = () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            setLoading(true);

            fetch('http://localhost:5000/uploadMenuImage', {
                method: 'POST',
                body: formData,
                mode: 'cors',
                headers: {}
            })
                .then(response => response.json())
                .then(result => {
                    setMenuDetails({
                        dishName: result.data.food_details.food_name,
                        dishImage: result.data.photo, // Placeholder image
                        price: '0.0',
                        description: result.data.food_details.description,
                        category: result.data.food_details.category,
                        healthMetrics: result.data.food_details.health_metrics
                    });
                    
                })
                .catch(error => console.log('error', error))
                .finally(() => setLoading(false));
        } else {
            console.warn('No image selected');
        }
    };

    const handleSave = () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
            "mobile_number": "9137357003",
            "photos": [menuDetails.dishImage],
            "food_name": menuDetails.dishName,
            "description": menuDetails.description,
            "health_metrics": menuDetails.healthMetrics,
            "category": menuDetails.category,
            "price": menuDetails.price
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:5000/menu", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                router.push("/items");

            })
            .catch((error) => console.error(error));
        setLoading(false);
        console.log(menuDetails);
    };

    const handleCategoryChange = (e, index) => {
        const updatedCategories = [...menuDetails.category];
        updatedCategories[index] = e.target.value;
        setMenuDetails(prevState => ({
            ...prevState,
            category: updatedCategories
        }));
    };

    const handleRemoveCategory = (index) => {
        const updatedCategories = menuDetails.category.filter((_, i) => i !== index);
        setMenuDetails(prevState => ({
            ...prevState,
            category: updatedCategories
        }));
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setMenuDetails(prevState => ({
                ...prevState,
                category: [...prevState.category, newCategory.trim()]
            }));
            setNewCategory('');
        }
    };

    return (
        <div className="flex h-screen w-full">
            {/* Image Uploader */}
            <div className={`w-full flex items-center justify-center ${menuDetails.dishImage ? 'hidden' : ''}`}>
                <div className="flex flex-col items-center">
                    <h2 className=" text-2xl font-bold mb-[25px] text-[#3f7cf5]">UPLOAD DISH IMAGE</h2>
                    {selectedImage ?
                        <img src={URL.createObjectURL(selectedImage)} alt="image" className="w-[300px] h-[300px]" />
                        :
                        <div className="p-8 border-[3px] border-dotted border-gray-300 rounded-lg bg-gray-100 text-center flex flex-col justify-center items-center ">
                            <h2 className="text-xl font-semibold ">Upload Image</h2>
                            <label className="flex flex-col justify-center items-center mt-4 ">
                                <div className="cursor-pointer border-2 border-dotted h-[100%] w-[100%] border-gray-400 px-4 rounded-lg bg-white py-[30px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 mx-auto text-gray-500"
                                        height="24"
                                        fill="gray"
                                        viewBox="0 -960 960 960"
                                        stroke="currentColor"
                                    >
                                        <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                                    </svg>
                                    <p className="text-gray-500 mt-2">
                                        Choose a file or drag it here
                                    </p>
                                    <input
                                        className=" hidden"
                                        type="file"
                                        accept=".jpg,.png,.jpeg,.webp"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </label>
                        </div>
                    }
                    {loading ? (
                        <div className="mt-4">
                            <ScaleLoader color="#2563eb" />
                            Hold on!
                        </div>
                    ) : (
                        <button
                            className="mt-4 py-2 px-6 bg-[#3f7cf5] text-white rounded-[10px]"
                            onClick={handleUpload}
                        >
                            UPLOAD
                        </button>
                    )}
                </div>
            </div>

            {/* Section 1 */}
            <div className={`w-[40%] flex flex-col items-center justify-center bg-gray-100 p-8 ${menuDetails.dishImage ? '' : 'hidden'}`}>
                <h2 className="text-3xl mb-8 text-[#285dc6]">Menu</h2>
                <div className="w-60% h-60  mb-4">
                    <img src={menuDetails.dishImage} alt={menuDetails.dishName} className="w-full rounded-[20px] h-full object-cover" />
                </div>
                <h3 className="text-xl mb-2">{menuDetails.dishName}</h3>
                <p className="text-sm font-semibold mb-1">Price: </p>
                <input
                    type="text"
                    name="price"
                    value={menuDetails.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-20 bg-white border rounded-md p-2 border-[#96b6f4] mb-2"
                />
            </div>
            {/* Section 2 */}
            <div className={`w-[60%]  p-8 ${menuDetails.dishImage ? '' : 'hidden'}`}>
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
                                className="bg-blue-200 rounded-md py-2 px-4 mr-2 mb-2 flex items-center"
                            >
                                <input
                                    type="text"
                                    name={`category.${index}`}
                                    value={category}
                                    onChange={(e) => handleCategoryChange(e, index)}
                                    className="bg-transparent border-none outline-none mr-2"
                                />
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleRemoveCategory(index)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <div className="bg-blue-200 rounded-md py-2 px-4 mr-2 mb-2 flex items-center">
                            <input
                                type="text"
                                name="newCategory"
                                value={newCategory}
                                onChange={handleNewCategoryChange}
                                placeholder="New category"
                                className="bg-transparent border-none outline-none mr-2"
                            />
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-2 rounded-md"
                                onClick={handleAddCategory}
                            >
                                Add
                            </button>
                        </div>
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
