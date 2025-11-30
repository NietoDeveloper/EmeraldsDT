import axios from "../../../utils/axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddIngredient = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("IngredientImage", image);

      const { data } = await axios.post("/ingredient/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        MySwal.fire({
          title: data.message,
          text: "You clicked the button!",
          icon: "success",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: error.response ? error.response.data.error : "An error occurred",
        text: "You clicked the button!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ring-1 shadow-xl ring-black mt-20 rounded-xl p-5">
      <h3 className="text-center mb-8 font-bold text-color-red">
        Ingredients Information
      </h3>

      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor={`ingredient-name`}
              className="block mb-2 text-sm font-medium"
            >
              Ingredient Name
            </label>
            <input
              type="text"
              id={`ingredient-name`}
              className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 sm:text-xs focus:ring-color-red focus:border-color-red"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label
              htmlFor={`ingredient-price`}
              className="block mb-2 text-sm font-medium"
            >
              Ingredient Price
            </label>
            <input
              type="number"
              id={`ingredient-price`}
              className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 sm:text-xs focus:ring-color-red focus:border-color-red"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-md font-medium"
              htmlFor={`ingredient-image`}
            >
              Upload Ingredients Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border-2 border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none focus:border-color-red"
              aria-describedby="user_avatar_help"
              id={`ingredient-image`}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-color-red mr-3 text-white px-5 py-1 rounded-full font-hobo hover:shadow-sm"
        >
          {loading ? "Adding Ingredient..." : "Add Ingredient"}
        </button>
      </form>
    </div>
  );
};

export default AddIngredient;
