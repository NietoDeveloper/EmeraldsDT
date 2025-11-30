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
          ? "font-hobo-light font-[700] border-b-4 border-b-red-500 text-[18px]"
          : ""
      }`}
      onClick={() => {
        if (index === 0) {
          setMenu(!menu);
        }
      }}
    >
      <a href={link} download={pdf ? "ABOUT OUR FOOD" : undefined}>
        {text}
      </a>{" "}
      {drop &&
        (menu ? (
          <FaAngleDown className="text-[18px] ml-2 transform rotate-180" />
        ) : (
          <FaAngleDown className="text-[18px] ml-2 " />
        ))}
    </li>
  );
}

export default NavItem;
