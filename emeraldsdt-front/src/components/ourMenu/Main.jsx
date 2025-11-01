import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import AddToCart from "./AddToCart";
import axios from "../../utils/axios";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedItem, setSelectedItem] = useState({});
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({
    data: { items: [] },
    categories: [],
    categoryNames: [],
  });

  const navigate = useNavigate();

  const closeModel = (e) => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/admin/getItem");
        const uniqueCategories = [
          ...new Set(data.items.map((item) => item.category)),
        ];
        const categoryNames = await Promise.all(
          uniqueCategories.map(async (category) => {
            const { data } = await axios.get(
              `/admin/getCategoryById/${category}`
            );
            return data.category;
          })
        );
        // Sort categoryNames based on position
        const sortedCategoryNames = categoryNames.sort(
          (a, b) => a.position - b.position
        );
        setState({
          data,
          categories: uniqueCategories,
          categoryNames: sortedCategoryNames,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleModalShow = async (item) => {
    setShowModal(true);
    try {
      const { data } = await axios.get(`/admin/getItemById/${item._id}`);
      setSelectedItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToOneItem = (item) => {
    localStorage.setItem("oneItemId", item._id);
    navigate(`/our-menu/item/${item._id}`);
  };

  const groupedCategories = state.data.items?.reduce((acc, item) => {
    if (item && item.category) {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
    }
    return acc;
  }, {});

  // Slice the first two categories and their items
  const firstTwoCategories = state.categoryNames.slice(0, 2);

  // Filter out the first two categories from all categories
  const remainingCategories = state.categoryNames.slice(2);

  return (
    <>
      <h1 className="font-hobo lg:text-6xl text-4xl text-center lg:pl-10 lg:mt-0 mt-20">
        Full Menu
      </h1>
      {loading ? ( // Render loading message while data is being fetched
        <div className="flex justify-center items-center lg:h-screen lg:-mt-52">
          <div class="flex justify-center items-center lg:h-screen">
            <div class="animate-spin ease-linear rounded-full w-20 h-20 border-t-2 border-b-2 border-red-500 ml-3"></div>
          </div>
        </div>
      ) : (
        <div className="lg:mt-24 relative menupage lg:pl-10">
          {firstTwoCategories.map((category, index) => (
            <div key={index} className="">
              <h1 className="text-3xl font-bold mt-20 max-sm:mt-28 lg:mb-12 text-center">
                {category.category}
              </h1>
              <div className="mt-10 grid lg:grid-cols-3 grid-cols-2 gap-8 lg:gap-x-20 lg:gap-y-20 max-sm:-mb-20 relative menupage  w-full">
                {groupedCategories[category._id].map((item, index) => (
                  <div key={index} className=" w-full ">
                    <div
                      className="relative lg:w-56 w-full  mx-auto"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        src={item.image.url}
                        alt=""
                        className="lg:w-[140px] lg:h-[120px] w-[100px] h-[80px] object-cover block mx-auto cursor-pointer"
                        onClick={() => navigateToOneItem(item)}
                      />
                      <p className="text-center lg:text-[18px] text-sm mt-3 ">
                        {item.name}
                      </p>
                      <div
                        className="h-8 w-8  absolute lg:top-1/2   right-0  lg:translate-x-[-30%] top-[40%] translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer justify-center"
                        onClick={() => handleModalShow(item)}
                      >
                        <FaPlus className="text-[#bebebe]" />
                      </div>
                      <div className="h-8 w-8 absolute lg:top-1/2 left-6 lg:-translate-x-1/2 -translate-x-full -translate-y-1/2 top-[40%] flex items-center cursor-pointer justify-center">
                        <FaMinus className="text-[#bebebe]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="absolute overflow-hidden z-10  left-0 mx-auto w-full lg:px-40  "
        style={{ maxWidth: "1600px" }}
      >
        <div>
          {remainingCategories.map((category, index) => (
            <div key={index} className="">
              <h1 className="text-3xl font-bold mt-20 max-sm:mt-28 lg:mb-24 text-center">
                {category.category}
              </h1>
              <div className="mt-10 grid lg:grid-cols-4 grid-cols-2 gap-8 lg:gap-y-20 lg:gap-x-16 lg:ml-2 relative menupage w-full">
                {/* Replace the placeholder logic with your actual rendering logic */}
                {groupedCategories[category._id].map((item, index) => (
                  <div key={index} className="w-full">
                    <div
                      className="relative lg:w-56 w-full mx-auto"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        src={item.image.url}
                        alt=""
                        className="lg:w-[140px] lg:h-[120px] w-[100px] h-[80px] object-cover block mx-auto cursor-pointer"
                        onClick={() => navigateToOneItem(item)}
                      />
                      <p className="text-center lg:text-[18px] text-sm mt-3 ">
                        {item.name}
                      </p>
                      <div
                        className="h-8 w-8 absolute  right-0 lg:-right-0 top-[40%] flex items-center cursor-pointer justify-center"
                        onClick={() => handleModalShow(item)}
                      >
                        <FaPlus className="text-[#bebebe]" />
                      </div>
                      <div className="h-8 w-8 absolute lg:top-1/2 left-6 lg:-translate-x-1/2 -translate-x-full -translate-y-1/2 top-[40%] flex items-center cursor-pointer justify-center">
                        <FaMinus className="text-[#bebebe]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
      {/* modal for details */}
      <AddToCart
        showModal={showModal}
        closeModal={closeModel}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default Main;
