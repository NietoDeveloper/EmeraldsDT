import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "../utils/axios";
import AddToCart from "../components/ourMenu/AddToCart";
import { useNavigate } from "react-router-dom";

const Merchandise = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const { data } = await axios.get("/product/getProducts");
        setMenuItems(data.products);
        setLoading(false); // Set loading to false when data is fetched
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
  const navigateToOneProduct = (item) => {
    localStorage.setItem("oneProductId", item._id);
    navigate(`/merchandise/${item._id}`);
  };

  const closeModel = (e) => {
    setShowModal(false);
  };
  return (
    <div style={{ maxWidth: "1600px" }} className="mx-auto">
      <Navbar />
      <div className="lg:px-40 lg:mt-52 mt-24">
        <h1 className="text-4xl font-bold pl-5 text-center">Our Merchandise</h1>
        {loading ? ( // Render loading message while data is being fetched
          <div className="flex justify-center items-center h-screen lg:-mt-52">
            <div class="flex justify-center items-center h-screen">
              <div class="animate-spin ease-linear rounded-full w-20 h-20 border-t-2 border-b-2 border-red-500 ml-3"></div>
            </div>
          </div>
        ) : (
          <div className="mt-16 max-sm:px-10 grid md:grid-cols-4 gap-8 lg:gap-x-[7.5rem] lg:gap-y-24 lg:ml-6  grid-cols-2 relative menupage">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative lg:w-56 w-full mx-auto cursor-pointer"
              >
                <img
                  src={item.image.url}
                  alt=""
                  className="lg:w-[140px] lg:h-[120px] w-[100px] h-[80px] object-cover block mx-auto"
                  onClick={() => navigateToOneProduct(item)}
                />
                <p className="text-center lg:text-[18px] text-sm mt-3">
                  {item.name}
                </p>
                <div
                  className="h-8 w-8  absolute lg:top-1/2   right-0  lg:translate-x-[-30%] top-[40%] translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer justify-center"
                  onClick={() => handleModalShow({ item: item })}
                >
                  <FaPlus className="text-[#bebebe]" />
                </div>
                <div className="h-8 w-8 absolute lg:top-1/2 left-6 lg:-translate-x-1/2 -translate-x-full -translate-y-1/2 top-[40%] flex items-center cursor-pointer justify-center">
                  <FaMinus className="text-[#bebebe]" />
                </div>
              </div>
            ))}
          </div>
        )}
        <Footer />
      </div>

      <AddToCart
        showModal={showModal}
        closeModal={closeModel}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Merchandise;
