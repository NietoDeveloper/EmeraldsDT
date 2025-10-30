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
  }, []);
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-full shadow">
      {adminData?.orderAccept === false && (
        <div className="w-full py-2 moving px-5 bg-color-red  whitespace-nowrap items-center overflow-x-auto">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          <h1 className="text-white inline-block ">
            We are currently not taking any orders. We will be back soon. Thank
            you for your patience.
          </h1>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <h1 className="text-white inline-block">
            We are currently not taking any orders. We will be back soon. Thank
            you for your patience.
          </h1>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <h1 className="text-white inline-block">
            We are currently not taking any orders. We will be back soon. Thank
            you for your patience.
          </h1>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <h1 className="text-white inline-block">
            We are currently not taking any orders. We will be back soon. Thank
            you for your patience.
          </h1>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      )}

      <nav
        className={`relative   w-full lg:flex mx-auto  z-40 items-center justify-between lg:px-40 px-8 lg:h-auto overflow-hidden transition-all duration-300 ease-linear  ${
          navbar ? "h-auto bg-gray-100 pb-5" : "h-16 "
        }`}
        style={{ maxWidth: "1600px" }}
      >
        {navbar ? (
          <MdOutlineClose
            className="text-[30px] lg:hidden block absolute right-5 top-5 cursor-pointer"
            onClick={handleCloseNavbar}
          />
        ) : (
          <IoIosMenu
            className="text-[30px] lg:hidden block absolute right-5 top-5 cursor-pointer"
            onClick={handleOpenNavbar}
          />
        )}
        <Link to="/">
          <img src={logo} className="lg:h-24 h-16 lg:pl-8" alt="" />
        </Link>
        <div className="flex items-center lg:h-32">
          <ul
            className={`lg:flex lg:mt-0 mt-5 items-center relative lg:h-full ${
              isActivemenu
                ? "[&>*:nth-child(1)]:font-[700] [&>*:nth-child(1)]:border-b-4 [&>*:nth-child(1)]:border-b-red-500"
                : ""
            }`}
          >
            {[
              { text: "our menu", link: "#", drop: true, pdf: false },
              // i added the link to the about our food pdf here
              {
                text: "About Our Food",
                link: AllergensGuidePDF,
                drop: false,
                pdf: true,
              },
              {
                text: "our merchandise",
                link: "/merchandise",
                drop: false,
                pdf: false,
              },
              {
                text: "news & events",
                link: "/allnews",
                drop: false,
                pdf: false,
              },
            ].map((item, index) => (
              <NavItem
                key={index}
                pdf={item.pdf}
                text={item.text}
                menu={menu}
                setMenu={setMenu}
                link={item.link}
                drop={item.drop}
                index={index}
              />
            ))}

            <li className="uppercase px-5 text-[20px] text-color-red font-hobo relative cursor-pointer lg:mt-0 mt-4">
              <Link to="/userLogin">
                <FaRegUser />
              </Link>
            </li>
            <li
              className="uppercase px-5 text-[20px] text-color-red font-hobo relative cursor-pointer lg:mt-0 mt-4"
              onClick={() => navigate("/cart")}
            >
              <IoBagOutline />
              <span className="absolute -top-2 lg:right-2 left-10 text-[12px] bg-black h-4 w-4 flex items-center justify-center m-0 rounded-full text-white">
                {cartValue}
              </span>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`w-full flex lg:pl-32 pl-10 justify-between items-center lg:gap-12  flex-col transition-all duration-100 ease-linear overflow-hidden bg-white shadow-md  absolute top-18 left-1/2 -translate-x-1/2 z-30 ${
          menu ? "h-auto py-10 " : "h-0"
        }`}
      >
        <div className="w-full flex pl-5  items-center justify-left lg:hidden">
          <button
            onClick={handleviewfullmenu}
            className="bg-color-red text-white px-3 py-2 rounded-md font-hobo"
          >
            View Full Menu
          </button>
        </div>
        <div className="grid lg:grid-cols-3 content-center gap-3 grid-cols-1 pt-5  lg:w-[60%] w-full">
          {category &&
            category?.map((cat, index) => (
              <div
                key={index}
                className="flex justify-start items-center gap-5 cursor-pointer"
                onClick={() => handleNavigateToOurMenu(cat._id, cat.category)}
              >
                <img
                  src={cat.image.url}
                  alt=""
                  className="w-[78px] h-[78px] object-cover"
                />
                <p className="text-[1pc] text-[#292929]">{cat.category}</p>
              </div>
            ))}
        </div>
        <div className="w-full flex  items-center justify-center max-sm:hidden">
          <button
            onClick={handleviewfullmenu}
            className="bg-color-red text-white px-3 py-2 rounded-md font-hobo mt-3 -ml-32"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
