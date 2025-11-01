import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateModel = ({ toggleModal, isOpen, selectedIngredient }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientImage, setIngredientImage] = useState(null);
  const [ingredientPrice, setIngredientPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIngredientImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (ingredientName !== "") formData.append("name", ingredientName);
    if (ingredientImage !== null)
      formData.append("IngredientImage", ingredientImage);
    if (ingredientPrice !== "") formData.append("price", ingredientPrice);

    try {
      setLoading(true);

      const { data } = await axios.post(
        `/ingredient/update/${selectedIngredient._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        MySwal.fire({
          icon: "success",
          title: "Item Updated Successfully",
        });
      }
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300`}
        onClick={toggleModal}
      ></div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 flex items-center justify-center z-10`}
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
          <div className="text-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-center font-hobo text-color-red">
              Update Ingredient
            </h1>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="itemName"
                >
                  Ingredient Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="itemName"
                  type="text"
                  placeholder={selectedIngredient?.name}
                  onChange={(e) => setIngredientName(e.target.value)}
                  value={ingredientName}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="itemName"
                >
                  Ingredient Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="itemName"
                  type="number"
                  placeholder={selectedIngredient?.price}
                  onChange={(e) => setIngredientPrice(e.target.value)}
                  value={ingredientPrice}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2">
                  Ingredient Image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 ring-1 ring-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 "
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div className="w-full flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="py-2 cursor-pointer px-5 rounded-xl bg-black text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 cursor-pointer px-5 rounded-xl bg-color-red text-white"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModel;
