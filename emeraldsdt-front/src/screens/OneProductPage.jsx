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
                <div className="w-full h-full flex flex-col max-sm:text-center">
                  <h1 className="text-4xl font-hobo">
                    {itemData?.product?.name}
                  </h1>
                  <p className="text-2xl mt-5">€ {itemData?.product?.price}</p>
                  <p className="mt-3">{itemData?.product?.description}</p>

                  {/* add to cart btn */}
                  <div className="mt-10 gap-5 flex justify-start max-sm:justify-center">
                    <button
                      onClick={() =>
                        handleModalShow({ item: itemData?.product })
                      }
                      className="bg-color-red text-white py-2 px-6 rounded-lg font-hobo-light"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*related product section start */}
          <h1 className="text-4xl font-hobo text-center  mt-20">
            Related Products{" "}
          </h1>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={window.innerWidth > 768 ? 4 : 1}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            className="mySwiper max-sm:px-10 "
          >
            {relatedProducts &&
              relatedProducts
                .filter((item) => item._id !== itemData?.product?._id) // Filter out the selected item
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => {
                        localStorage.setItem("oneItemId", item._id);
                        navigate(`/our-menu/${item.category}`);
                      }}
                      className="w-full lg:h-[400px] flex max-sm:pt-10  items-center justify-center"
                    >
                      <div className="w-[250px] h-[200px] flex flex-col items-center text-center justify-center">
                        <img
                          className="w-[140px] h-[120px] object-cover"
                          src={item.image.url}
                          alt=""
                        />
                        <h1 className="text-[18px] font-hobo mt-5">
                          {item.name}
                        </h1>
                        <p className="text-[18px] mt-5">€ {item.price}</p>
                        <div
                          onClick={() => handleModalShow(item)}
                          className="h-8 w-8  absolute top-[30%] right-0 -translate-x-1/3 flex items-center cursor-pointer justify-center"
                        >
                          <FaPlus className="text-[#bebebe] hover:text-red-500" />
                        </div>
                        <div className="h-8 w-8 absolute top-[30%] left-3 -translate-x-1/3 flex items-center cursor-pointer justify-center">
                          <FaMinus className="text-[#bebebe] hover:text-red-500" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>

          {/*related product section end */}

          <Footer />
        </div>
      )}
      <AddToCart
        showModal={showModal}
        closeModal={closeModel}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default OneProductPage;
