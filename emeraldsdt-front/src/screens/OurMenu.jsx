import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/ourMenu/Hero";
import Footer from "../components/Footer";

const OurMenu = () => {
  const location = useLocation();

  return (
    <div style={{ maxWidth: "1600px" }} className="mx-auto">
      <Navbar />
      <div className="lg:px-40 lg:pt-16 relative lg:mt-28">
        <Hero />
        {location.pathname === "/our-menu/main" ? null : <Footer />}
      </div>
    </div>
  );
};

export default OurMenu;
