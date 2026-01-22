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
      clas
