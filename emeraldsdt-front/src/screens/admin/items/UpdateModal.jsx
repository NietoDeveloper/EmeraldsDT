import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateModal = ({ toggleModal, isOpen, slectedItem }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [calories, setCalories] = useState("");
  const [nutrition, setNutrition] = useState([
    { name: "Saturated Fat", value: "" },
    { name: "Total Sugars", value: "" },
    { name: "Vitamin D", value: "" },
    { name: "Dietary Fiber", value: "" },
    { name: "Added Sugars", value: "" },
    { name: "Potassium", value: "" },
    { name: "Calcium", value: "" },
    { name: "Iron", value: "" },
    { name: "Sodium", value: "" },
    { name: "Trans Fat", value: "" },
    { name: "Cholesterol", value: "" },
  ]);
  const [ingredient, setIngredient] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/admin/getCategory");
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleNutritionChange = (index, value) => {
    setNutrition((prevNutrition) => {
      const updatedNutrition = [...prevNutrition];
      updatedNutrition[index].value = value;
      return updatedNutrition;
    });
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data } = await axios.get("/ingredient/read/all");
        setIngredient(data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIngredients();
  }, [slectedItem]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const formData = new FormData();

      // Append fields to formData if they are updated
      if (name !== "") formData.append("name", name);
      if (price !== "") formData.append("price", price);
      if (category !== "") formData.append("category", category);
      if (image !== null) formData.append("image", image);
      if (calories !== "") formData.append("calories", calories);
      if (fat !== "") formData.append("fat", fat);
      if (carbs !== "") formData.append("carbs", carbs);
      if (protein !== "") formData.append("protein", protein);

      // Append nutrition data individually
      nutrition.forEach((item, index) => {
        formData.append(`nutrition[${index}][name]`, item.name);
        formData.append(`nutrition[${index}][value]`, item.value);
      });

      // Append selected ingredients
      selectedIngredients.forEach((id) => {
        formData.append("ingredients", id);
      });

      // // consoling formdata to check if all the data is appended
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      const { data } = await axios.post(
        `/admin/updateItem/${slectedItem._id}`,
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
      setUploading(false);
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300`}
        onClick={toggleModal}
      ></div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } inset-0 flex items-center justify-center z-10`}
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-2/3 absolute left-1/2 -translate-x-1/2 top-10">
          <div className="text-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-center font-hobo text-color-red">
              Update Item
            </h1>
            <form onSubmit={SubmitHandler}>
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-sm font-bold mb-2"
                    htmlFor="itemName"
                  >
                    Item Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                    id="itemName"
                    type="text"
                    placeholder={`${slectedItem?.name}`}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-sm font-bold mb-2"
                    htmlFor="itemPrice"
                  >
                    Item Price
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                    id="itemPrice"
                    type="number"
                    placeholder={`${slectedItem?.price}`}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  name="type"
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2">
                  Item Image
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

              <div className="ring-1 shadow-xl ring-black mt-20 rounded-xl p-5">
                <h3 className="text-center mb-8 font-bold text-color-red">
                  Ingredients Information
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  {/* Ingredients checkbox */}

                  {ingredient.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`ingredient-${index}`}
                        value={item._id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIngredients((prev) => [
                              ...prev,
                              item._id,
                            ]);
                          } else {
                            setSelectedIngredients((prev) =>
                              prev.filter((id) => id !== item._id)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className="block text-sm font-medium"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ring-1 shadow-xl ring-black mt-10 rounded-xl p-5">
                <h3 className="text-center mb-8 font-bold text-color-red">
                  Nutritions Information
                </h3>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium"
                    >
                      Total Calories
                    </label>
                    <input
                      type="number"
                      id="small-input"
                      className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 sm:text-xs focus:ring-color-red focus:border-color-red"
                      onChange={(e) => setCalories(e.target.value)}
                      value={calories}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium"
                    >
                      Total Fat
                    </label>
                    <input
                      type="number"
                      id="small-input"
                      className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 sm:text-xs focus:ring-color-red focus:border-color-red"
                      onChange={(e) => setFat(e.target.value)}
                      value={fat}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium"
                    >
                      Total Carbs
                    </label>
                    <input
                      type="number"
                      id="small-input"
                      className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 sm:text-xs focus:ring-color-red focus:border-color-red"
                      onChange={(e) => setCarbs(e.target.value)}
                      value={carbs}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium"
                    >
                      Total Protein
                    </label>
                    <input
                      type="number"
                      id="small-input"
                      className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 sm:text-xs focus:ring-color-red focus:border-color-red"
                      onChange={(e) => setProtein(e.target.value)}
                      value={protein}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-10">
                  {nutrition.map((item, index) => (
                    <div key={index}>
                      <label
                        htmlFor={`small-input-${index}`}
                        className="block mb-2 text-sm font-medium"
                      >
                        {item.name}: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id={`small-input-${index}`}
                        className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red"
                        onChange={(e) =>
                          handleNutritionChange(index, e.target.value)
                        }
                        value={item.value}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex items-center mt-5 justify-end gap-4">
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
                  {uploading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
