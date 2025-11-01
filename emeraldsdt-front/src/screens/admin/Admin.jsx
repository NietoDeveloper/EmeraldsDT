import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { TbDeviceAnalytics, TbSitemap } from "react-icons/tb";
import {
  FaChevronDown,
  FaShoppingBasket,
  FaBoxes,
  FaListAlt,
  FaImages,
  FaNewspaper,
  FaStore,
  FaUserFriends,
} from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    { label: "Items", state: false },
    { label: "Categories", state: false },
    { label: "Ingredient", state: false },
    { label: "Banner", state: false },
    { label: "Merchandise", state: false },
    { label: "News", state: false },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/signin");
    }
  }, []);

  const toggleSubchildVisibility = (index) => {
    const updatedMenuItems = menuItems.map((item, i) => {
      if (i === index) {
        return { ...item, state: !item.state };
      } else {
        return { ...item, state: false };
      }
    });
    setMenuItems(updatedMenuItems);
  };

  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/signin");
  };
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#ff0000]  text-white font-bold transition-all duration-500 ease-in-out overflow-auto`}
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
          Admin Panel
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
              to="/admin/dashboardView"
              className="flex items-center gap-4 px-4 py-2"
            >
              <TbDeviceAnalytics className="text-xl mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>

          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                item.state ? "h-32" : ""
              }`}
              onClick={() => toggleSubchildVisibility(index)}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                {index === 0 && <FaShoppingBasket className="text-xl mr-2" />}
                {index === 1 && <FaBoxes className="text-xl mr-2" />}
                {index === 2 && <FaListAlt className="text-xl mr-2" />}
                {index === 3 && <FaImages className="text-xl mr-2" />}
                {index === 4 && <FaStore className="text-xl mr-2" />}
                {index === 5 && <FaNewspaper className="text-xl mr-2" />}
                <span>{item.label}</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {item.state && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to={`/admin/add${item.label}`} className="px-4 py-2">
                      Add {item.label}
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to={`/admin/all${item.label}`} className="px-4 py-2">
                      All {item.label}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ))}

          {/* user */}
          <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
            <Link
              to="/admin/allUser"
              className="flex items-center gap-4 px-4 py-2"
            >
              <FaUserFriends className="text-xl mr-2" />
              <span>Customer Details</span>
            </Link>
          </li>

          {/* orders */}
          <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
            <Link
              to="/admin/makeSubAdmin"
              className="flex items-center gap-4 px-4 py-2"
            >
              <TbSitemap className="text-xl mr-2" />
              <span>Make SubAdmin</span>
            </Link>
          </li>

          {/* orders */}
          <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
            <Link
              to="/admin/allOrders"
              className="flex items-center gap-4 px-4 py-2"
            >
              <TbSitemap className="text-xl mr-2" />
              <span>Order History</span>
            </Link>
          </li>

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

export default Admin;
