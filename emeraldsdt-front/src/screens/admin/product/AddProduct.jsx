import axios from "../../../utils/axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
const MySwal = withReactContent(Swal);

const AddProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!productName.trim()) {
      newErrors.productName = "Product Name is required";
    }
    if (!productPrice.trim()) {
      newErrors.productPrice = "Product Price is required";
    }
    if (!productDescription.trim()) {
      newErrors.productDescription = "Product Description is required";
    }
    if (!productStock.trim()) {
      newErrors.productStock = "Product Stock is required";
    }
    if (!productImage) {
      newErrors.productImage = "Product Image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("description", productDescription);
      formData.append("stock", productStock);
      formData.append("image", productImage);

      const { data } = await axios.post("/product/createProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        const messageToShow =
          typeof data.message === "object"
            ? JSON.stringify(data.message)
            : data.message;
        MySwal.fire({
          title: messageToShow,
          text: "You clicked the button!",
          icon: "success",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white shadow-sm shadow-color-red p-10 md:w-1/2 lg:w-full mx-auto rounded">
        <h1 className="text-2xl font-bold mb-10 text-center font-hobo text-color-red">
          Add Product
        </h1>
        <form onSubmit={submitHandler}>
          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Product Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red ${
                errors.productName ? "border-red-500" : ""
              }`}
              placeholder=""
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            {errors.productName && (
              <span className="text-red-500 ml-2">{errors.productName}</span>
            )}
          </div>
          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Product Price
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red ${
                errors.productPrice ? "border-red-500" : ""
              }`}
              placeholder=""
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
            {errors.productPrice && (
              <span className="text-red-500 ml-2">{errors.productPrice}</span>
            )}
          </div>
          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Product Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red ${
                errors.productDescription ? "border-red-500" : ""
              }`}
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
            {errors.productDescription && (
              <span className="text-red-500 ml-2">
                {errors.productDescription}
              </span>
            )}
          </div>
          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Product Stock
              <span className="text-red-500">*</span>
            </label>

            <select
              className={`border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red ${
                errors.productStock ? "border-red-500" : ""
              }`}
              onChange={(e) => setProductStock(e.target.value)}
              value={productStock}
            >
              <option value="">Select Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            {errors.productStock && (
              <span className="text-red-500 ml-2">{errors.productStock}</span>
            )}
          </div>
          <div className="flex items-center mb-10">
            <label
              htmlFor="product"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Product Image
              <span className="text-red-500">*</span>
            </label>
            <input
              id="product"
              type="file"
              className={`border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red ${
                errors.productImage ? "border-red-500" : ""
              }`}
              onChange={handleFileChange}
              accept="image/*"
            />
            {errors.productImage && (
              <span className="text-red-500 ml-2">{errors.productImage}</span>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-color-red text-white px-10 py-2 rounded-full font-hobo hover:shadow-sm"
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
