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
t handleCloseNavbar = () => {

