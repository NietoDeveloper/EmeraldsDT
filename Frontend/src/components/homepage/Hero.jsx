import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import axios from "../../utils/axios";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Hero = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    try {
      const getBanner = async () => {
        const { data } = await axios.get("/admin/getBanner");


        setBanner(data.banners);
      };
      getBanner();
    } catch (error) {
      console.log(error);
    }
  }, []);



export default Hero;
