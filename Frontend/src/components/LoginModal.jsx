import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "../utils/axios";
import toast from "react-hot-toast";

const LoginModal = ({ showModal, setShowModal, setIsUserAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();

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
            Login
          </div>
          <div className="px-4 py-3 mb-8">
            <form onSubmit={SubmitHandler}>
              <label className="block mt-4 text-sm after:absolute relative after:h-[1px] after:w-full after:transition-all after:duration-300 after:bg-color-red after:bottom-0 after:left-0  ">
                <span className="text-gray-700">Email Address</span>
                <input
                  type="email"
                  className="block w-full mt-2 text-sm py-2 outline-none  form-input "
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />

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

export default LoginModal;
