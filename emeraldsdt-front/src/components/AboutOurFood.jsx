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
        <div className="flex justify-center items-center mt-10">
          <a href={AllergensGuidePDF} target="_blank" rel="noopener noreferrer">
            <button className="bg-color-red py-2 px-5 rounded-md text-white font-hobo mt-2 -ml-1 uppercase">
              Download PDF
            </button>
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutOurFood;
