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
        <div
          className={`w-full px-6 py-4 mx-auto bg-white rounded-3xl shadow-md shadow-color-red md:max-w-md pointer-events-auto transition-all duration-300 delay-200 ${
            showModal ? "scale-100" : "scale-0"
          } `}
        >
          <div className="mb-4 text-lg font-bold text-center text-gray-700">
            We are currently not accepting any orders. Please try again later.
          </div>
        </div>

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
