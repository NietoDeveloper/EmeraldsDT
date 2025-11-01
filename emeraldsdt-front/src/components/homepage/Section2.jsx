import React, { useEffect, useState } from "react";
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
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    try {
      const getBanner = async () => {
        const { data } = await axios.get("/admin/getBanner");

        // console.log(data.banners);
        // Check if data is an array before setting it

        setBanner(data.banners);
        setLoading(false); // Set loading to false when data is fetched
      };
      getBanner();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {loading ? ( // Render loading message while data is being fetched
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-2 border-b-2 border-red-500 ml-3"></div>
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={false}
          className="mySwiper w-full lg:mt-14 mt-16"
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            nextEl: ".hero_right",
            prevEl: ".hero_left",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {banner &&
            banner.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="w-full lg:h-[28rem] h-[25rem] mt-14  lg:pl-10   px-2">
                  <div className="h-full w-full overflow-hidden flex max-sm:flex-col-reverse items-center py-0  relative">
                    <div className=" lg:w-[40%] w-full h-fit flex flex-col justify-start gap-5 p-5  rounded lg:absolute lg:top-32 lg:left-5 left-0 translate-[-50%] bg-white ">
                      <h1 className="lg:text-4xl text-3xl font-hobo">
                        {banner.banners.head}
                      </h1>
                      <p>{banner.banners.content}</p>
                      <Link to="/our-menu/main">
                        <button className="bg-color-red font-hobo shadow-md shadow-gray-200 text-white w-fit py-2 px-5 rounded-lg uppercase">
                          {banner.banners.btn}
                        </button>
                      </Link>
                    </div>
                    <div className="h-full w-full rounded overflow-hidden">
                      <img
                        className="w-full h-full object-cover rounded bg-center"
                        src={banner.banners.url}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
};

export default Section2;
