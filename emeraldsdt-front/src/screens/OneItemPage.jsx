import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import AddToCart from "../components/ourMenu/AddToCart";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
const OneItemPage = () => {
  const [itemData, setItemData] = useState({});
  const navigate = useNavigate();
  const oneItemIdFromLocalStorage = localStorage.getItem("oneItemId");
  const catgoryId = localStorage.getItem("categoryId");
  const [selectedItem, setSelectedItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [expanded1, setExpanded1] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const { data } = await axios.get(
          `/admin/getItemById/${oneItemIdFromLocalStorage}`
        );
        // console.log(data?.item?.category, "data");
        setItemData(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemData();
  }, [oneItemIdFromLocalStorage]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const { data } = await axios.get(
          `/admin/getItemByCategory/${catgoryId}`
        );

        setRelatedProducts(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRelatedProducts();
  }, [catgoryId]);

  // console.log(relatedProducts, "relatedProducts");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/admin/getItemByCategory/${itemData?.item?.category}`
        );
        // console.log(data, "dfs");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleModalShow = (item) => {
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
        <div className="lg:px-40 lg:mt-44">
          <div className="h-auto w-full pt-20 px-10">
            <div className="h-auto flex max-sm:flex-col w-full items-center">
              <div className="lg:w-3/5 h-full flex items-center justify-center">
                <img
                  className="lg:h-[300px] lg:w-[350px]  object-cover"
                  src={itemData?.item?.image?.url}
                  alt=""
                />
              </div>
              <div className="lg:w-2/5 max-sm:mt-10 h-full">
                <div className="w-full h-full flex flex-col">
                  <h1 className="text-4xl font-hobo">{itemData?.item?.name}</h1>
                  <p className="text-2xl mt-5">€ {itemData?.item?.price}</p>
                  <p className="mt-3">{itemData?.item?.description}</p>

                  {/* add to cart btn */}
                  <div className="mt-10 gap-5 flex justify-start">
                    <button
                      onClick={() => handleModalShow(itemData)}
                      className="bg-amber-300 text-black  py-2 px-6 rounded-lg font-hobo-light"
                    >
                      Customize
                    </button>

                    <button
                      onClick={() => handleModalShow(itemData)}
                      className="bg-color-red text-white py-2 px-6 rounded-lg font-hobo-light"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {itemData?.ingredients ? (
              <div className="h-auto w-full  lg:mt-32 max-sm:mt-20">
                <h1 className="text-4xl font-hobo text-center">
                  Ingredients in the {itemData?.item?.name}
                </h1>
                <div className="h-full w-full  lg:mt-8 grid lg:grid-cols-6 grid-cols-2">
                  {itemData?.ingredients &&
                    itemData?.ingredients.map((ingredient, index) => (
                      <div key={index} className="lg:p-5 p-2">
                        <img
                          className="w-[150px] h-[150px]  object-contain"
                          src={ingredient?.IngredientImage?.url}
                          alt=""
                        />
                        <p className="text-center mt-2 capitalize">
                          {ingredient.name}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              " "
            )}
          </div>
          {/*Nutritional Information section start */}
          <div className="relative font-inter antialiased lg:mt-20 my-10">
            <main className="relative  flex flex-col justify-center  overflow-hidden">
              <div className="h-auto w-full  ">
                <h1 className="text-4xl  font-hobo text-center">
                  Nutritional Information{" "}
                </h1>
                {/* Accordion component */}
                <div className="divide-y divide-gray-300 lg:px-36 lg:py-20 px-5">
                  {/* Accordion item 1 */}
                  <div className="py-2 max-sm:mt-10">
                    <h2>
                      <button
                        id="faqs-title-01"
                        type="button"
                        className="flex items-center justify-between w-full text-left font-semibold py-2"
                        onClick={() => setExpanded1(!expanded1)}
                        aria-expanded={expanded1}
                        aria-controls="faqs-text-01"
                      >
                        <span className="font-bold text-2xl ">
                          View nutrition summary
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 25 25"
                          className={`shrink-0 ml-8  transform ${
                            expanded1 ? "rotate-180" : "rotate-0"
                          }`}
                          width={16}
                          height={16}
                        >
                          <path
                            style={{ fill: "#232326" }}
                            d="M12.5 7 23 17.293l-.707.707L12.5 8.414 2.707 18 2 17.293 12.5 7z"
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id="faqs-text-01"
                      role="region"
                      aria-labelledby="faqs-title-01"
                      className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                        expanded1
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="lg:px-2 px-5 py-8 text-base font-normal grid lg:grid-cols-3 grid-cols-1 gap-8">
                          <div>
                            <div className="flex justify-center flex-col items-center w-full gap-3 pb-5 ">
                              <h1 className="text-3xl font-light">
                                {itemData?.item?.calories}kCal
                              </h1>
                              <p>Energy</p>
                            </div>
                            <div>
                              <div className="relative overflow-x-auto">
                                <table className="w-full">
                                  <tbody>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Serving Size:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[1]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Saturated Fat:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[0]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Trans fat:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[9]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Cholesterol:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[10]?.value}
                                        mg
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center ">
                              <div className="flex justify-center flex-col items-center gap-3 pb-5">
                                <h1 className="text-3xl font-light">
                                  {itemData?.item?.fat}g
                                </h1>
                                <p>Total fat</p>
                              </div>
                              <div className="flex justify-center flex-col items-center gap-3 pb-5">
                                <h1 className="text-3xl font-light">
                                  {itemData?.item?.carbs}g
                                </h1>
                                <p>Carbohydrate</p>
                              </div>
                            </div>
                            <div>
                              <div className="relative overflow-x-auto">
                                <table className="w-full">
                                  <tbody>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Sodium:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[8]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Dietary Fibre:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[3]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Sugars:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[4]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Vitamin A:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[5]?.value}
                                        ug
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-center flex-col items-center gap-3 pb-5">
                              <h1 className="text-3xl font-light">
                                {" "}
                                {itemData?.item?.protein}g
                              </h1>
                              <p>Protein</p>
                            </div>
                            <div>
                              <div className="relative overflow-x-auto">
                                <table className="w-full">
                                  <tbody>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Vitamin C:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[2]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Calcium:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[6]?.value}g
                                      </td>
                                    </tr>
                                    <tr className="border-b-2 border-dotted flex justify-between">
                                      <td className="py-4">Iron:</td>
                                      <td className="py-4">
                                        {itemData?.item?.nutrition[7]?.value}g
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/*Nutritional Information section end */}

          {/*related product section start */}
          <h1 className="text-4xl font-hobo text-center lg:mb-8 mb-5 ">
            Related Products{" "}
          </h1>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={window.innerWidth > 768 ? 3 : 1}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            className="mySwiper max-sm:px-10"
            // make responsive
          >
            {relatedProducts &&
              relatedProducts
                .filter((item) => item._id !== itemData?.item?._id) // Filter out the selected item
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => {
                        localStorage.setItem("oneItemId", item._id);
                        navigate(`/our-menu/${item.category}`);
                      }}
                      className="w-full lg:h-[400px] flex max-sm:px-10 items-center justify-center"
                    >
                      <div className="lg:w-[250px] lg:h-[200px] flex flex-col items-center text-center justify-center">
                        <img
                          className="lg:w-[140px] lg:h-[120px] w-[150px] h-[150px] lg:object-cover object-contain"
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

export default OneItemPage;
