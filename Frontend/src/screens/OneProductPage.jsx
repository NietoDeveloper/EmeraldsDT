import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../utils/axios";
import AddToCart from "../components/ourMenu/AddToCart";
        <div className="lg:px-40 lg:mt-36">
          <div className="h-auto w-full pt-20 px-10">
            <div className="h-auto flex max-sm:flex-col w-full items-center">

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
