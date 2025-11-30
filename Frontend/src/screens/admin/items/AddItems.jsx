import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import toast from "react-hot-toast";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
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
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data } = await axios.get("/ingredient/read/all");
        setIngredients(data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIngredients();
  }, []);

  const handleNutritionChange = (index, value) => {
    const updatedNutrition = [...nutrition];
    updatedNutrition[index].value = value;
    setNutrition(updatedNutrition);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

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
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Item Name is required";
    }
    if (!price.trim()) {
      newErrors.price = "Item Price is required";
    }
    if (!description.trim()) {
      newErrors.description = "Item Description is required";
    }
    if (!category.trim()) {
      newErrors.category = "Category is required";
    }
    if (!image) {
      newErrors.image = "Image is required";
    }
    if (!calories.trim()) {
      newErrors.calories = "Calories is required";
    }
    if (!protein.trim()) {
      newErrors.protein = "Protein is required";
    }
    if (!carbs.trim()) {
      newErrors.carbs = "Carbs is required";
    }
    if (!fat.trim()) {
      newErrors.fat = "Fat is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);
      formData.append("calories", calories);
      formData.append("protein", protein);
      formData.append("carbs", carbs);
      formData.append("fat", fat);
      nutrition.forEach((item, index) => {
        formData.append(`nutrition[${index}][name]`, item.name);
        formData.append(`nutrition[${index}][value]`, item.value);
      });
      selectedIngredients.forEach((id) => {
        formData.append("ingredients", id);
      });

      const { data } = await axios.post("/admin/addItem", formData, {
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
        // reload the window
        window.location.reload();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white shadow-sm shadow-color-red p-10 md:w-1/2 lg:w-full mx-auto rounded">
        <h1 className="text-2xl font-bold mb-10 text-center font-hobo text-color-red">
          Add Items
        </h1>

        <form className="w-full mx-auto" onSubmit={SubmitHandler}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label
                for="item_name"
                className={`block mb-2 text-sm font-medium ${
                  errors.name ? "text-red-500" : ""
                }`}
              >
                Item Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="item_name"
                className={`block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder=""
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />

              {errors.name && (
                <p className="text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                for="floating_company"
                className={`block mb-2 text-sm font-medium ${
                  errors.price ? "text-red-500" : ""
                }`}
              >
                Item Price
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="floating_company"
                id="floating_company"
                className={`block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red ${
                  errors.price ? "border-red-500" : ""
                }`}
                placeholder=" "
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />

              {errors.price && (
                <p className="text-red-500 mt-1">{errors.price}</p>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-7 group">
            <label
              for="floating_dec"
              className={`block mb-2 text-sm font-medium ${
                errors.description ? "text-red-500" : ""
              }`}
            >
              Item Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              type="text"
              name="floating_dec"
              id="floating_dec"
              className={`block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder=" "
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />

            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2  md:gap-6">
            <div className="relative z-0 w-full mb-7 group">
              <div className="flex flex-col items-start mb-3">
                <label
                  className="block mb-2 text-md font-medium "
                  htmlFor="category"
                >
                  Select Category <span className="text-red-500">*</span>
                </label>

                <select
                  name="category"
                  id="category"
                  className={`block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red ${
                    errors.category ? "border-red-500" : ""
                  }`}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="text-red-500 mt-1">{errors.category}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-7 group">
              <div>
                <label
                  className="block mb-2 text-md font-medium "
                  htmlFor="user_avatar"
                >
                  Upload Item Image
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className={`block w-full text-sm text-gray-900 border-2 border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none focus:border-color-red ${
                    errors.image ? "border-red-500" : ""
                  }`}
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </div>
              {errors.image && (
                <p className="text-red-500 mt-1">{errors.image}</p>
              )}
            </div>
          </div>

          <div className="ring-1 shadow-xl ring-black mt-20 rounded-xl p-5">
            <h3 className="text-center mb-8 font-bold text-color-red">
              Ingredients Information
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Ingredients checkbox */}

              {ingredients.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`ingredient-${index}`}
                    value={item._id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIngredients((prev) => [...prev, item._id]);
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

          <div className="ring-1 shadow-xl ring-black mt-20 rounded-xl p-5">
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
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="small-input"
                  className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red"
                  onChange={(e) => setCalories(e.target.value)}
                  value={calories}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium"
                >
                  Total Fat
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="small-input"
                  className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red"
                  onChange={(e) => setFat(e.target.value)}
                  value={fat}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium"
                >
                  Total Carbs
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="small-input"
                  className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red"
                  onChange={(e) => setCarbs(e.target.value)}
                  value={carbs}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium"
                >
                  Total Protein
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="small-input"
                  className="block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red"
                  onChange={(e) => setProtein(e.target.value)}
                  value={protein}
                  required
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
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-color-red text-white px-10 py-2 rounded-full font-hobo hover:shadow-sm"
            >
              {uploading ? "Uploading..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
