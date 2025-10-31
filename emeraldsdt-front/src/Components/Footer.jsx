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
          <h1 className="font-hobo text-color-red text-2xl ">Our Company</h1>
          <p className="text-md mt-3">About Us</p>
          <p className="text-md mt-1">Our Fundamentals</p>
          <p className="text-md mt-1">Our Team</p>
        </div>
        <div>
          <h1 className="font-hobo text-color-red text-2xl ">Contact Us</h1>
          <Link to="/contact">
            <p className=" text-md mt-3 ml-[1px]">Let's Talk</p>
          </Link>
        </div>
        <div>
          <h1 className="font-hobo text-color-red text-2xl ">
            Important Links
          </h1>

          <p
            onClick={handleReload}
            className="cursor-pointer text-md mt-3 ml-[1px]"
          >
            Home
          </p>

          <Link to="/our-menu/main">
            <p className=" text-md mt-1 ml-[1px]">Our Menu</p>
          </Link>
          <Link to="/merchandise">
            <p className=" text-md mt-1 ml-[1px]">Our Merchandise</p>
          </Link>
        </div>
        <div className="">
          <h1 className="font-hobo text-color-red text-2xl ">News & Events</h1>
          <Link to="/allnews">
            <p className=" text-md mt-3 ml-[1px]">News & Events</p>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 max-sm:mt-10 mt-5">
        <div className="h-10 w-10 rounded-full border-[1.5px] border-black flex items-center justify-center cursor-pointer hover:bg-white  transition-all duration-300">
          <a
            href="https://www.facebook.com/letsfalafelofficial"
            target="_blank"
          >
            <FaFacebookF className="text-md" />
          </a>
        </div>
        <div className="h-10 w-10 rounded-full border-[1.5px] border-black flex items-center justify-center cursor-pointer hover:bg-white  transition-all duration-300">
          <a
            href="https://www.instagram.com/letsfalafelofficial/"
            target="_blank"
          >
            <FaInstagram className="text-md" />
          </a>
        </div>
        <div className="h-10 w-10 rounded-full border-[1.5px] border-black flex items-center justify-center cursor-pointer hover:bg-white  transition-all duration-300">
          <a
            href="https://www.linkedin.com/company/letsfalafelofficial/about/"
            target="_blank"
          >
            <FaLinkedinIn className="text-md" />
          </a>
        </div>
      </div>
      <hr className="mt-10" />

      <div className="flex pt-10 lg:pb-24 pb-10 items-center max-sm:flex-col justify-between">
        <div className="flex items-center gap-7">
          <p className="text-md cursor-pointer">Privacy Policy</p>
          <p className="text-md cursor-pointer">Terms of Use</p>
        </div>
        <div>
          <p>© 2024 Let's Falafel. All Rights Reserved</p>
        </div>
        <div>
          <p>
            Managed by{" "}
            <a
              href="https://vpatch.ae/"
              target="_blank"
              className="text-red-500 cursor-pointer font-medium"
            >
              {" "}
              V Patch
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
