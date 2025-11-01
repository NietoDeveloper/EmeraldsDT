import axios from "../../../utils/axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsImage, setNewsImage] = useState(null);

  const handleFileChange = (e) => {
    setNewsImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("featured", featured);
    formData.append("image", newsImage);

    try {
      setLoading(true);
      const { data } = await axios.post("/news/createNews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        MySwal.fire({
          title: "News Created!",
          text: "Your file has been created.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white shadow-sm shadow-color-red p-10 md:w-1/2 lg:w-full mx-auto rounded">
        <h1 className="text-2xl font-bold mb-10 text-center font-hobo text-color-red">
          Add News & Events
        </h1>
        <form onSubmit={submitHandler}>
          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              News Title
            </label>
            <input
              type="text"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
              placeholder=""
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              News Description
            </label>
            <textarea
              type="text"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
              placeholder=""
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Featured
            </label>
            <select
              name="type"
              id="type"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
              onChange={(e) => setFeatured(e.target.value)}
              value={featured}
              required
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="true">Make Featured</option>
              <option value="false">Don't Make Featured</option>
            </select>
          </div>

          <div className="flex items-center mb-10">
            <label
              htmlFor="news"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              News Image
            </label>
            <input
              id="news"
              type="file"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-color-red text-white px-10 py-2 rounded-full font-hobo hover:shadow-sm"
              disabled={loading}
            >
              {loading ? "Adding News..." : "Add News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
