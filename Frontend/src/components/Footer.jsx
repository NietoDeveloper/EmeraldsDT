import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleReload = () => {
    if (window.location.pathname === "/") {
      window.scrollTo(0, 0); // Scroll to the top before reloading
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full lg:pl-10 px-7 lg:pr-5 mt-10 ">
      <hr className="mb-10" />

