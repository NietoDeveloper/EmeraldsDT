import React from "react";
import { IoClose } from "react-icons/io5";

const DisableOrderModal = ({ setShowModal, showModal }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-400 bg-opacity-50 transition-all duration-300 ease-linear  ${
          showModal ? "visible" : "invisible"
        }`}
        id="modal"
      >


        {/* Close Model Icon */}
        <div
          className="absolute top-0 right-0 mt-10 mr-10 cursor-pointer h-10 w-10 rounded-full bg-color-red flex justify-center items-center hover:bg-red-400 transition-all duration-300 delay-200 ease-out"
          onClick={() => setShowModal(false)}
        >
          <IoClose className="text-white text-2xl" />
        </div>
      </div>
    </>
  );
};

export default DisableOrderModal;
