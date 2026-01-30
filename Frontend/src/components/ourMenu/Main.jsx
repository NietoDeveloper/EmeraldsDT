import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import AddToCart from "./AddToCart";
import axios from "../../utils/axios";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedItem, setSelectedItem] = useState({});
  const [loading, setLoading] = useState(true);



  const navigate = useNavigate();

  const closeModel = (e) => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/admin/getItem");
        const uniqueCategories = [
          ...new Set(data.items.map((item) => item.category)),
        ];
        const categoryNames = await Promise.all(
          uniqueCategories.map(async (category) => {
            const { data } = await axios.get(
              `/admin/getCategoryById/${category}`
            );
            return data.category;
          })
        );
        // Sort categoryNames based on position
        const sortedCategoryNames = categoryNames.sort(
          (a, b) => a.position - b.position
        );
        setState({
          data,
          categories: uniqueCategories,
          categoryNames: sortedCategoryNames,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleModalShow = async (item) => {
    setShowModal(true);
    try {
      const { data } = await axios.get(`/admin/getItemById/${item._id}`);
      setSelectedItem(data);
    } catch (error) {
      console.log(error);
    }
  };



export default Main;
