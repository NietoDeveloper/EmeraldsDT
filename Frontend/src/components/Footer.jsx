import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/Bogota",
      };

      const timeString = new Date().toLocaleTimeString("es-CO", options);
      setCurrentTime(timeString);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleReload = () => {
    if (window.location.pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      navigate("/");
    }
  };

  return (
    <footer className="w-full bg-white text-gray-700 pt-16 md:pt-20 lg:pt-24 px-4 sm:px-8 xl:px-20 mx-auto max-w-[1800px]">
      <hr className="border-gray-200" />


export default Footer;
