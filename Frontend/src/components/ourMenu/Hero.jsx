import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddToCart from "./AddToCart";


  // const handleModalShow = async (item) => {
  //   setShowModal(true);
  //   try {
  //     const { data } = await axios.get(`/admin/getItemById/${item._id}`);
  //     setSelectedItem(data);
  //   } catch (error) {
  
  // }, []);

  // useEffect(() => {
  //   const fetchCategoryNames = async () => {
  //     try {
  //       const categoryNames = await Promise.all(
  //         categories.map(async (category) => {
  //           const { data } = await axios.get(
  //             `/admin/getCategoryById/${category}`
  //           );
  //           return data.category;
  //         })
  //       );
  //       // Sort categoryNames based on position
  //       const sortedCategoryNames = categoryNames.sort(
  //         (a, b) => a.position - b.position
  //       );
  //       setCategoryNames(sortedCategoryNames);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchCategoryNames();
  // }, [categories]);

  // const groupedCategories = data?.items?.reduce((acc, item) => {
  //   if (item && item.category) {
  //     acc[item.category] = acc[item.category] || [];
  //     acc[item.category].push(item);
  //   }
  //   return acc;
  // }, {});

  return (
    <>
      <div className="w-full flex lg:pl-11 mt-10 pb-10">
        <div className="h-full w-1/4 lg:block hidden  top-10 left-0 sidebar">
          <div
            className={`flex relative items-center gap-5 bg-white py-1 px-2  rounded-md overflow-hidden border-[1px] border-gray-600 cursor-pointer ${
              location.pathname === "/our-menu/main"
                ? "after:bg-color-red after:h-full font-bold after:w-1 after:absolute after:top-0 after:left-0"
                : ""
            }`}
            onClick={() => navigate("/our-menu/main")}
          >
            <img
              src="https://s7d1.scene7.com/is/image/mcdonalds/nav_full_menu_160x160_:category-panel-left-desktop"

