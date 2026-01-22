import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FaRegUser } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import axios from "../utils/axios";
import { DataContext } from "../ContexApi";
import AllergensGuidePDF from "../assets/AllergensGuide.pdf";

const Navbar = () => {
  const [navbar, setNavbar] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [category, setCategory] = React.useState([]);
  const { cartValue, setCartValue } = useContext(DataContext);
  const { existingCartContext } = useContext(DataContext);

  const handleCloseNavbar = () => {
    setNavbar(false);
    setMenu(false);
  };

  const handleOpenNavbar = () => {
    setNavbar(true);
  };

  const navigate = useNavigate();

  const handleNavigateToOurMenu = (id, name) => {
    localStorage.setItem("categoryId", id);
    localStorage.setItem("categoryName", name);

    if (!id) {
      navigate("/our-menu/main");
      setMenu(false);
      return;
    }
    navigate(`/our-menu/${id}`);
    setMenu(false);
  };
  const handleviewfullmenu = () => {
    navigate(`/our-menu/main`);
    setMenu(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/admin/getCategory");
        const sortadCategory = data.categories.sort(
          (a, b) => a.position - b.position
        );
        setCategory(sortadCategory);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartValue(existingCart.length);
  }, [cartValue, existingCartContext]);

  const isActivemenu = window.location.pathname === "/our-menu/main";

  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data } = await axios.get("/admin/getAdmin");
        setAdminData(data?.admin[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminData();

      <div
        className={`w-full flex lg:pl-32 pl-10 justify-between items-center lg:gap-12  flex-col transition-all duration-100 ease-linear overflow-hidden bg-white shadow-md  absolute top-18 left-1/2 -translate-x-1/2 z-30 ${
          men
            View Full Products
          </button>
    
};

export default Navbar;
