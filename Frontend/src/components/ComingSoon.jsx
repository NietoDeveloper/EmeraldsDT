import React from "react";
import logo from "../assets/logo.png";

const ComingSoon = () => {
  return (
    <div
      style={{ maxWidth: "1600px" }}
      className="mx-auto flex justify-center items-center h-screen  lg:px-44"
    >
      <div className="flex justify-between max-sm:flex-col-reverse items-center w-full">
        <div className="w-1/2 flex justify-center items-center">
          <h1 className="lg:text-5xl text-3xl font-hobo ">Coming Soon</h1>
        </div>
        <div className="w-1/2 flex justify-center items-center ">
          <img src={logo} alt="Logo" className="lg:w-80 w-full " />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
