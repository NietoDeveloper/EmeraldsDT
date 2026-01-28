import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AllergensGuidePDF from "../assets/AllergensGuide.pdf";

const AboutOurFood = () => {
  return (
    <div>
      {/* Navbar */}

      {/* PDF with no scroll bar */}
      <div className="overflow-hidden lg:px-40">
        <Navbar />
        {/* here i want to on send the link whare user can click and download pdf */}
        <div
         
      </div>
    </div>
  );
};

export default AboutOurFood;
