import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

function NavItem({ text, menu, link, pdf, setMenu, drop, index }) {
  const location = useLocation();

  const isActive =
  