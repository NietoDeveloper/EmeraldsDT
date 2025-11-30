import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/homepage/Menu";

import Footer from "../components/Footer";
import Section2 from "../components/homepage/Section2";

const Hompage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ maxWidth: "1600px" }} className="mx-auto">
      {" "}
      <Navbar />
      <div className="lg:px-40 lg:mt-44">
        <Section2 />
        <Menu />
        <Footer />
      </div>
    </div>
  );
};

export default Hompage;
