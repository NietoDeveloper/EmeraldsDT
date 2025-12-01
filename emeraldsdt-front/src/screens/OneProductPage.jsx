import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../utils/axios";
import AddToCart from "../components/ourMenu/AddToCart";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const OneProductPage = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const oneProductIdFromLocalStorage = localStorage.getItem("oneProductId");
  const [itemData, setItemData] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/product/getProduct/${oneProductIdFromLocalStorage}`
        );
        setItemData(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [oneProductIdFromLocalStorage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/product/getProducts");
        setRelatedProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleModalShow = (item) => {
    // console.log(item, "lkl");
    setShowModal(true);
    setSelectedItem(item);
  };

  const closeModel = (e) => {
    setShowModal(false);
  };

  // console.log(itemData);
  return (
    <div style={{ maxWidth: "1600px" }} className="mx-auto">
      <Navbar />
      {loading ? ( // Render loading message while data is being fetched
        <div className="flex justify-center items-center h-screen">
          <div class="flex justify-center items-center h-screen">
            <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
          </div>
        </div>
      ) : (
        <div className="lg:px-40 lg:mt-36">
          <div className="h-auto w-full pt-20 px-10">
            <div className="h-auto flex max-sm:flex-col w-full items-center">
              <div className="lg:w-3/5 w-full h-full flex items-center justify-center">
                <img
                  className="h-[300px] lg:w-[350px] w-[250px] object-cover"
                  src={itemData?.product?.image?.url}
                  alt=""
                />
              </div>
              <div className="lg:w-2/5 w-full h-full">
