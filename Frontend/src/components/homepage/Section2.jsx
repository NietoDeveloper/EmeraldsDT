import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const Section2 = () => {
 


    <>
      {loading ? ( // Render loading message while data is being fetched
        <div className="flex justify-center items-center h-80">
         
        </div>

          pagination={false}


          {banner &&
            banner.map((banner, index) => (
              <SwiperSlide key={index}>

  );
};

export default Section2;
