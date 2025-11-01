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
          <div
            role="status"
            className=" p-10  w-[33%]  rounded animate-pulse md:p-6 "
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded "></div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full " />
            <div className="flex items-center mt-4">
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2" />
                <div className="w-48 h-2 bg-gray-200 rounded-full " />
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
          <div
            role="status"
            className=" w-[33%]  p-10   rounded animate-pulse md:p-6 "
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded "></div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full " />
            <div className="flex items-center mt-4">
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2" />
                <div className="w-48 h-2 bg-gray-200 rounded-full " />
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
          <div
            role="status"
            className=" w-[33%]  p-10  rounded animate-pulse md:p-6 "
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded "></div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full " />
            <div className="flex items-center mt-4">
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2" />
                <div className="w-48 h-2 bg-gray-200 rounded-full " />
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={window.innerWidth > 768 ? 3 : 1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={false}
          className="mySwiper w-full lg:pb-10 mt-10"
          navigation={false}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <Slide
                navigate={navigate}
                itemName={cat.category}
                cat_id={cat._id}
                itemDesc={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                }
                itemImage={cat.image.url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

const Slide = ({ navigate, itemName, cat_id, itemImage, itemDesc }) => {
  const HandleNavigate = (id, name) => {
    localStorage.setItem("categoryId", id);
    localStorage.setItem("categoryName", name);
    navigate(`/our-menu/${id}`);
  };

  return (
    <div
      className="h-full relative overflow-hidden border-2 py-5 rounded-xl cursor-pointer"
      onClick={() => HandleNavigate(cat_id, itemName)}
    >
      <div className="w-full relative">
        <div className="px-5 h-full">
          <img src={itemImage} alt="" className="w-1/2 block mx-auto mb-5" />
        </div>
        <div className="px-4 pt-4 h-[5rem] w-full">
          <div className="flex justify-center">
            <h1 className="text-[21px] font-hoboc font-semibold ">
              {itemName}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
