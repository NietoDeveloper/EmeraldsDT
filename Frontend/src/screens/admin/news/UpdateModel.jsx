import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateModel = ({ toggleModal, isOpen, selectedNews }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsImage, setNewsImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewsImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append fields to formData if they are updated
    if (title !== "") formData.append("title", title);
    if (description !== "") formData.append("description", description);
    if (featured !== "") formData.append("featured", featured);
    if (newsImage !== null) formData.append("image", newsImage);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `news/updateNews/${selectedNews._id}`,
        formData
      );

      if (data.success) {
        toggleModal();
        MySwal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success",
        });

        // Reload the page after updating
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
              News & Events
            </h1>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="itemName"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="itemName"
                  type="text"
                  placeholder="Enter Item Name"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="itemPrice"
                  type="number"
                  placeholder="Enter Item Price"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2">
                  Featured
                </label>
                <select
                  name="type"
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  onChange={(e) => setFeatured(e.target.value)}
                  value={featured}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="true">Make Featured</option>
                  <option value="false">Remove</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2">
                  News Image
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
