import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

function NavItem({ text, menu, link, pdf, setMenu, drop, index }) {
  const location = useLocation();

  const isActive =
    location.pathname === link && location.pathname !== "/our-menu/main";
  const isActivemenu = location.pathname === "/our-menu/main";

  return (
    <li
      className={`capitalize px-5 text-[18px]  h-full font-hobo-light relative transition-all duration-100 cursor-pointer after:lg:block after:hidden flex items-center lg:mt-0 mt-4 ${
        isActive
     
        (menu ? (
          <FaAngleDown className="text-[18px] ml-2 transform rotate-180" />
        ) : (
          <FaAngleDown className="text-[18px] ml-2 " />
        ))}
    </li>
  );
}

export default NavItem;
