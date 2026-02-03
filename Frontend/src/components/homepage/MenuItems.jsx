import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const MenuItems = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/admin/getCategory");
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="lg:text-3xl text-2xl font-hobo text-color-red">
          Our Menu
        </h1>
        <Link to="/our-menu/main">
          <button className="bg-color-red text-white max-sm:text-sm px-3 py-2 rounded-md font-hobo">
            View All Menu
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-between items-center ">






export default MenuItems;
