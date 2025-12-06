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
      <div className="w-full flex justify-between gap-7 max-sm:flex-col">
        <div>

        <div>

          >
            <FaFacebookF className="text-md" />
          </a>
        </div>
        <div className="h-10 w-10 rounded-full border-[1.5px] border-black flex items-center justify-center cursor-pointer hover:bg-white  transition-all duration-300">
          <a
            href="https://www.instagram.com/letsfalafelofficial/"
            target="_blank"
