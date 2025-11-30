import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import AddToCart from "./AddToCart";

const Items = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [itemData, setItemData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});

  const [showModal, setShowModal] = useState(false);

  const catgoryId = localStorage.getItem("categoryId");
  const categoryName = localStorage.getItem("categoryName");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/admin/getItemByCategory/${catgoryId}`
        );

        setData(data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [catgoryId]);

  // console.log(data);

  const navigateToOneItem = (item) => {
    localStorage.setItem("oneItemId", item._id);
    navigate(`/our-menu/item/${item._id}`);
  };

  const handleModalShow = async (item) => {
    setShowModal(true);
    try {
      const { data } = await axios.get(`/admin/getItemById/${item._id}`);
      setSelectedItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModel = (e) => {
    setShowModal(false);
  };

  return (
    <>
      <h1 className="font-hobo lg:pl-14 lg:text-5xl text-4xl text-center  lg:mt-0 mt-20">
        {categoryName}
      </h1>
      <div className="lg:mt-24 lg:pl-10 mt-10 grid  lg:grid-cols-3 grid-cols-2 gap-8 lg:gap-x-20 lg:gap-y-24 relative menupage  w-full">
        {data &&
          data.map((item) => (
            <div
              key={item._id}
              className="relative lg:w-56 w-full mx-auto cursor-pointer"
            >
              <img
                src={item.image.url}
                alt=""
                className="lg:w-[140px] lg:h-[120px] w-[100px] h-[80px] object-cover block mx-auto"
                onClick={() => navigateToOneItem(item)}
              />
              <p className="text-center lg:text-[18px] text-sm mt-3">
                {item.name}
              </p>
              <div
                className="h-8 w-8  absolute lg:top-1/2   right-0  lg:translate-x-[-30%] top-[40%] translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer justify-center"
                onClick={() => handleModalShow(item)}
              >
                <FaPlus className="text-[#bebebe]" />
              </div>
              <div className="h-8 w-8 absolute lg:top-1/2 left-6 lg:-translate-x-1/2 -translate-x-full -translate-y-1/2 top-[40%] flex items-center cursor-pointer justify-center">
                <FaMinus className="text-[#bebebe]" />
              </div>
            </div>
          ))}
      </div>

      <AddToCart
        showModal={showModal}
        closeModal={closeModel}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default Items;
