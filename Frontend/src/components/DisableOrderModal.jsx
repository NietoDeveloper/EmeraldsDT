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
   
        </div>
      </div>
    </>
  );
};

export default DisableOrderModal;
