import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddToCart from "./AddToCart";

const Hero = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  // const [selectedItem, setSelectedItem] = useState({});

  // const [showModal, setShowModal] = useState(false);

  // // new
  // const [data, setData] = useState({ items: [] });

  // const [categories, setCategories] = useState([]);
  // const [categoryNames, setCategoryNames] = useState([]);

  const closeModel = (e) => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/admin/getCategory");
        const sortadCategory = data.categories.sort(
          (a, b) => a.position - b.position
        );

        setCategory(sortadCategory);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const HandleNavigate = (id, name) => {
    localStorage.setItem("categoryId", id);
    localStorage.setItem("categoryName", name);
    navigate(`/our-menu/${id}`);
  };

  // const handleModalShow = async (item) => {
  //   setShowModal(true);
  //   try {
  //     const { data } = await axios.get(`/admin/getItemById/${item._id}`);
  //     setSelectedItem(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const navigateToOneItem = (item) => {
  //   localStorage.setItem("oneItemId", item._id);
  //   navigate(`/our-menu/item/${item._id}`);
  // };
  // // fetch all items from the backend
  // useEffect(() => {
  //   const fetchAllItems = async () => {
  //     const { data } = await axios.get("/admin/getItem");
  //     setData(data);
  //     const uniqueCategories = [
  //       ...new Set(data.items.map((item) => item.category)),
  //     ];
  //     setCategories(uniqueCategories);
  //   };
  //   fetchAllItems();
  // }, []);

  // useEffect(() => {
  //   const fetchCategoryNames = async () => {
  //     try {
  //       const categoryNames = await Promise.all(
  //         categories.map(async (category) => {
  //           const { data } = await axios.get(
  //             `/admin/getCategoryById/${category}`
  //           );
  //           return data.category;
  //         })
  //       );
  //       // Sort categoryNames based on position
  //       const sortedCategoryNames = categoryNames.sort(
  //         (a, b) => a.position - b.position
  //       );
  //       setCategoryNames(sortedCategoryNames);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchCategoryNames();
  // }, [categories]);

  // const groupedCategories = data?.items?.reduce((acc, item) => {
  //   if (item && item.category) {
  //     acc[item.category] = acc[item.category] || [];
  //     acc[item.category].push(item);
  //   }
  //   return acc;
  // }, {});

  return (
    <>
      <div className="w-full flex lg:pl-11 mt-10 pb-10">
        <div className="h-full w-1/4 lg:block hidden  top-10 left-0 sidebar">
          <div
            className={`flex relative items-center gap-5 bg-white py-1 px-2  rounded-md overflow-hidden border-[1px] border-gray-600 cursor-pointer ${
              location.pathname === "/our-menu/main"
                ? "after:bg-color-red after:h-full font-bold after:w-1 after:absolute after:top-0 after:left-0"
                : ""
            }`}
            onClick={() => navigate("/our-menu/main")}
          >
            <img
              src="https://s7d1.scene7.com/is/image/mcdonalds/nav_full_menu_160x160_:category-panel-left-desktop"
              alt=""
              className="w-[70px] h-[70px] object-cover"
            />
            <h6 className="text-[18px]">View Full Menu</h6>
          </div>

          {loading ? (
            <div className="mt-10 animate-pulse border-[1px]  border-gray-600 h-full p-2 rounded-md">
              <div className="h-[60px] bg-gray-200 rounded-md"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
              <div className="h-[60px] bg-gray-200 rounded-md mt-3"></div>
            </div>
          ) : (
            <div className="mt-10 relative border-[1px]  border-gray-600 h-full py-2 rounded-md">
              {category &&
                category?.map((cat, index) => (
                  <div
                    key={index}
                    className={`flex relative items-center gap-5 bg-white py-3 px-2  cursor-pointer ${
                      location.pathname === `/our-menu/${cat._id}`
                        ? "after:content-[''] after:bg-color-red after:h-full font-bold after:w-1 after:absolute after:top-0 after:left-0   after:transition-all after:duration-500"
                        : ""
                    }`}
                    onClick={() => HandleNavigate(cat._id, cat.category)}
                  >
                    <img
                      src={cat.image.url}
                      alt=""
                      className="w-[65px] h-[60px] object-cover"
                    />
                    <p className="text-[18px]">{cat.category}</p>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="h-full lg:w-3/4 w-full  max-sm:px-5 ">
          <Outlet />
        </div>
      </div>

      {/* {location.pathname === "/our-menu/main" && (
        <div className="lg:mt-24 relative menupage">
          {Object.keys(groupedCategories)
            .slice(1, 20)
            .map((category, index) => (
              <div key={index} className="">
                <h1 className="text-xl font-bold mt-20 text-center">
                  {categoryNames[index + 1] &&
                    categoryNames[index + 1].category}
                </h1>
                <div className="mt-10 grid lg:grid-cols-3 grid-cols-2 max-sm:px-5 gap-8 relative menupage  w-full">
                  {groupedCategories[category].map((item, index) => (
                    <div key={index} className=" w-full ">
                      <div className="relative lg:w-64 w-full mx-auto">
                        <img
                          src={item.image.url}
                          alt=""
                          className="lg:w-[140px] lg:h-[120px] w-[100px] h-[80px] object-cover block mx-auto cursor-pointer"
                          onClick={() => navigateToOneItem(item)}
                        />
                        <p className="text-center lg:text-[18px] text-sm mt-3">
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
      )} */}

      {/* <AddToCart
        showModal={showModal}
        closeModal={closeModel}
        selectedItem={selectedItem}
      /> */}
    </>
  );
};

export default Hero;
