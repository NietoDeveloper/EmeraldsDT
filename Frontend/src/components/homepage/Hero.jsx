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

  return (
    <div className="h-85vh]  relative w-full  flex items-center justify-between">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}

        pagination={false}
        className="mySwiper w-full h-full"
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {banner &&
          banner.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center relative md:justify-between h-full justify-center w-full">
                <img
                  className="w-full h-full object-cover bg-center"
                  src={banner.banners.url}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      
    </div>
  );
};

export default Hero;
