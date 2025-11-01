import axios from "../../../utils/axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddBanner = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [slideName, setSlideName] = useState("Slide 1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bannerHead, setBannerHead] = useState("");
  const [bannerContent, setBannerContent] = useState("");
  const [bannerBtn, setBannerBtn] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("silderName", slideName);
      formData.append("banner", bannerImage);
      formData.append("head", bannerHead);
      formData.append("content", bannerContent);
      formData.append("btn", bannerBtn);

      const { data } = await axios.post("/admin/addBanner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        // console.log(data);
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
      setError(
        error.response ? error.response.data.error : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  useEffect(() => {
    // Reset error when bannerImage changes
    setError(null);
  }, [bannerImage]);

  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white shadow-sm shadow-color-red p-10 md:w-1/2 lg:w-full mx-auto rounded">
        {/* here specify the size of banner that need to be uploaded and the size is 1168 × 520 px
         */}

        <h1 className="text-2xl font-bold mb-10 text-center font-hobo text-color-red">
          Add Banner
        </h1>

        <form onSubmit={submitHandler}>
          {/* select field for in which admin want to add banner eg: slide1 or slide2 */}

          <div className="flex items-center mb-10">
            <label
              htmlFor="banner"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Banner Image
            </label>
            <div className="w-full">
              <input
                id="banner"
                type="file"
                className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
                onChange={handleFileChange}
                accept="image/*"
              />
              <p className="text-red-500 ">
                <b>Note:</b> Banner size should be <strong>1168 x 520</strong>{" "}
                px
              </p>
            </div>
          </div>

          <div className="flex items-center mb-10">
            <label
              htmlFor="banner"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Banner heading
            </label>

            <div className="w-full">
              <input
                type="text"
                placeholder="Banner heading"
                className="border-b-2  w-full border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
                onChange={(e) => setBannerHead(e.target.value)}
                value={bannerHead}
                maxLength={50}
              />
              <p className="text-red-500 ">
                <b>Note:</b> Banner Heading should be{" "}
                <strong>50 Characters</strong> long
              </p>
            </div>
          </div>

          <div className="flex items-center mb-10">
            <label
              htmlFor="banner"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Banner content
            </label>

            <div className="w-full">
              <input
                type="text"
                placeholder="Banner content"
                className="border-b-2  w-full border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
                onChange={(e) => setBannerContent(e.target.value)}
                value={bannerContent}
                maxLength={100}
              />
              <p className="text-red-500 ">
                <b>Note:</b> Banner Content should be{" "}
                <strong>100 Characters</strong> long
              </p>
            </div>
          </div>

          <div className="flex items-center mb-10">
            <label
              htmlFor="banner"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Banner button
            </label>

            <div className="w-full">
              <input
                type="text"
                placeholder="Banner button"
                className="border-b-2 w-full border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
                onChange={(e) => setBannerBtn(e.target.value)}
                value={bannerBtn}
                maxLength={20}
              />
              <p className="text-red-500 ">
                <b>Note:</b> Banner Button should be{" "}
                <strong>20 Characters</strong> long
              </p>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="text-right">
            <button
              type="submit"
              className="bg-color-red text-white px-10 py-2 rounded-full font-hobo hover:shadow-sm"
              disabled={loading}
            >
              {loading ? "Adding Banner..." : "Add Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
