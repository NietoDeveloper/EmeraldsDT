import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateModel = ({ toggleModal, isOpen, selectedProduct }) => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [uploading, setUploading] = useState(false);
  const [productDescription, setProductDescription] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append fields to formData if they are updated
    if (productName !== "") formData.append("name", productName);
    if (productPrice !== "") formData.append("price", productPrice);
    if (productDescription !== "")
      formData.append("description", productDescription);
    if (productStock !== "") formData.append("stock", productStock);
    if (productImage !== null) formData.append("image", productImage);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `/product/updateProduct/${selectedProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toggleModal();
        MySwal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success",
        });
      }
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
        } fixed inset-0 flex items-center justify-center z-10`}
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
          <div className="text-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-center font-hobo text-color-red">
              Update Product
            </h1>
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-sm font-bold mb-2"
                    htmlFor="itemName"
                  >
                    Product Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                    id="itemName"
                    type="text"
                    placeholder="Enter Product Name"
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-sm font-bold mb-2"
                    htmlFor="itemPrice"
                  >
                    Product Price
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                    id="itemPrice"
                    type="number"
                    placeholder="Enter Product Price"
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  Product Stock
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  onChange={(e) => setProductStock(e.target.value)}
                  value={productStock}
                >
                  <option value="">Select Stock</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  Product Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="itemPrice"
                  type="number"
                  placeholder="Enter Product Description"
                  onChange={(e) => setProductDescription(e.target.value)}
                  value={productDescription}
                />
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

export default UpdateModel;
