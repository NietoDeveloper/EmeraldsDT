import React, { useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { TbDeviceAnalytics, TbSitemap } from "react-icons/tb";
import { MdOutlineNoteAlt } from "react-icons/md";
import { FaChevronDown, FaUserFriends } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const SubAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("subAdminToken")) {
      navigate("/admin/signin");
    }
  }, []);
  const [subAmdinId, setsubAdminId] = useState();
  useEffect(() => {
    const id = localStorage.getItem("subAdminId");
    setsubAdminId(id);
  }, []);

  const [isItemSubchildVisible, setItemSubchildVisible] = useState(false);
  const [isBannerSubchildVisible, setBannerSubchildVisible] = useState(false);
  const [isCategorySubchildVisible, setCategorySubchildVisible] =
    useState(false);
  const [isProductSubchildVisible, setProductSubchildVisible] = useState(false);
  const [isNewsSubchildVisible, setNewsSubchildVisible] = useState(false);
  const [isIngrdientSubchildVisible, setIngrdientSubchildVisible] =
    useState(false);

  const toggleItemSubchildVisibility = () => {
    setItemSubchildVisible(!isItemSubchildVisible);
    setBannerSubchildVisible(false);
    setCategorySubchildVisible(false);
    setProductSubchildVisible(false);
    setNewsSubchildVisible(false);
    setIngrdientSubchildVisible(false);
  };

  const toggleBannerSubchildVisibility = () => {
    setBannerSubchildVisible(!isBannerSubchildVisible);
    setItemSubchildVisible(false);
    setCategorySubchildVisible(false);
    setProductSubchildVisible(false);
    setNewsSubchildVisible(false);
    setIngrdientSubchildVisible(false);
  };

  const toggleCategorySubchildVisibility = () => {
    setCategorySubchildVisible(!isCategorySubchildVisible);
    setItemSubchildVisible(false);
    setBannerSubchildVisible(false);
    setProductSubchildVisible(false);
    setNewsSubchildVisible(false);
    setIngrdientSubchildVisible(false);
  };

  const toggleProductSubchildVisibility = () => {
    setProductSubchildVisible(!isProductSubchildVisible);
    setItemSubchildVisible(false);
    setBannerSubchildVisible(false);
    setCategorySubchildVisible(false);
    setNewsSubchildVisible(false);
    setIngrdientSubchildVisible(false);
  };

  const toggleNewsSubchildVisibility = () => {
    setNewsSubchildVisible(!isNewsSubchildVisible);
    setItemSubchildVisible(false);
    setBannerSubchildVisible(false);
    setCategorySubchildVisible(false);
    setProductSubchildVisible(false);
    setIngrdientSubchildVisible(false);
  };

  const toggleIngrdientSubchildVisibility = () => {
    setIngrdientSubchildVisible(!isIngrdientSubchildVisible);
    setItemSubchildVisible(false);
    setBannerSubchildVisible(false);
    setCategorySubchildVisible(false);
    setProductSubchildVisible(false);
    setNewsSubchildVisible(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("subAdminToken");
    navigate("/admin/signin");
  };

  const [subAdmin, setSubAdmin] = useState({});

  // console.log(subAmdinId);

  useEffect(() => {
    const getSubadmin = async () => {
      try {
        const { data } = await axios.get(`/admin/getSubAdmin/${subAmdinId}`);
        setSubAdmin(data.subadmin);
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    getSubadmin();
  }, [
    subAmdinId
  ]);


  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#ff0000]  text-white font-bold transition-all duration-500 ease-in-out`}
      >
        <Link
          to="/"
          className="flex items-center justify-center h-20  flex-col text-lg font-bold my-5 gap-2"
        >
          <img
            src="https://lets-falafel.netlify.app/assets/logo-K5rFdi-p.png"
            alt=""
            className="h-20 w-20"
          />
          Sub Admin Panel
        </Link>
        <ul className="text-white pt-4">
          {/* Home */}
          <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
            <Link to="/" className="flex items-center gap-4 px-4 py-2">
              <AiOutlineHome className="text-xl  mr-2" />
              <span>Home</span>
            </Link>
          </li>

          {/* Dashboard */}
          <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
            <Link
              to="/subAdmin/dashboardView"
              className="flex items-center gap-4 px-4 py-2"
            >
              <TbDeviceAnalytics className="text-xl mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Requests */}
          {subAdmin && subAdmin?.itemPermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isItemSubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleItemSubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>Items</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isItemSubchildVisible && (
                <ul className="transition-all duration-300">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addItems" className="px-4 py-2">
                      Add Items
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allItems" className="px-4 py-2">
                      All Items
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Banner */}
          {subAdmin && subAdmin?.bannerPermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isBannerSubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleBannerSubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>Banner</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isBannerSubchildVisible && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addBanner" className="px-4 py-2">
                      Add Banner
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allBanner" className="px-4 py-2">
                      All Banners
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Categories */}
          {subAdmin && subAdmin?.categoryPermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isCategorySubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleCategorySubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>Categories</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isCategorySubchildVisible && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addcategories" className="px-4 py-2">
                      Add Categories
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allcategories" className="px-4 py-2">
                      All Categories
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Products */}
          {subAdmin && subAdmin?.marchandisePermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isProductSubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleProductSubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>Merchandise</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isProductSubchildVisible && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addproducts" className="px-4 py-2">
                      Add Merchandise
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allproducts" className="px-4 py-2">
                      All Merchandise
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* News */}
          {subAdmin && subAdmin?.newsPermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isNewsSubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleNewsSubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>News</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isNewsSubchildVisible && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addnews" className="px-4 py-2">
                      Add News
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allnews" className="px-4 py-2">
                      All News
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Ingredient */}
          {subAdmin && subAdmin?.ingrdientPermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isIngrdientSubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleIngrdientSubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>Ingredient</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isIngrdientSubchildVisible && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addingredient" className="px-4 py-2">
                      Add Ingredient
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allingredient" className="px-4 py-2">
                      All Ingredient
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {subAdmin && subAdmin?.userPermission === true && (
            <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
              <Link
                to="/subadmin/allUser"
                className="flex items-center gap-4 px-4 py-2"
              >
                <FaUserFriends className="text-xl mr-2" />
                <span>User</span>
              </Link>
            </li>
          )}

          {subAdmin && subAdmin?.orderPermission === true && (
            <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
              <Link
                to="/subadmin/allOrders"
                className="flex items-center gap-4 px-4 py-2"
              >
                <TbSitemap className="text-xl mr-2" />
                <span>Orders</span>
              </Link>
            </li>
          )}

          {/* Log out */}
          <li
            className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black"
            onClick={logoutHandler}
          >
            <Link to="/" className="flex items-center gap-4 px-4 py-2">
              <AiOutlineLogout className="text-xl mr-2" />
              <span>Log out</span>
            </Link>
          </li>
        </ul>
      </div>
      <section className="ml-64 transition-all duration-500 ease-in-out">
        <div style={{ padding: "20px" }} className="grid grid-cols-1">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SubAdmin;
