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
     
     




           
export default Items;
