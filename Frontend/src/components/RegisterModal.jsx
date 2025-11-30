import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import LoginModal from "./LoginModal";

const RegisterModal = ({ setShowModal, showModal, setIsUserAuthenticated }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const showLoginModalHandler = () => {
    setShowLoginModal(true);
    setShowModal(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password does not match");
    } else {
      const { data } = await axios.post("/user/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      toast.success(data?.message);
      setShowModal(false);
      localStorage.setItem("userId", data?.user?._id);
      setIsUserAuthenticated(true);
    }
  };

  return (
    <>
      {/* Checkout Modal */}
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
            Register
          </div>
          <div className="px-4 py-3 mb-8">
            <form onSubmit={SubmitHandler}>
              <label className="block text-sm after:content-[''] after:absolute relative after:h-[1px] after:w-full after:transition-all after:duration-300 after:bg-color-red after:bottom-0 after:left-0  ">
                <span className="text-gray-700">Full name</span>
                <input
                  type="text"
                  className="block w-full mt-2 text-sm py-2 outline-none  form-input "
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </label>
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
              </label>

              <label className="block mt-4 text-sm after:content-[''] after:absolute relative after:h-[1px] after:w-full after:transition-all after:duration-300 after:bg-color-red after:bottom-0 after:left-0  ">
                <span className="text-gray-700">Phone</span>
                <input
                  type="number"
                  className="block w-full mt-2 text-sm py-2 outline-none  form-input "
                  placeholder="03001234567"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
              </label>
              <label className="block mt-4 text-sm after:content-[''] after:absolute relative after:h-[1px] after:w-full after:transition-all after:duration-300 after:bg-color-red after:bottom-0 after:left-0  ">
                <span className="text-gray-700">Address</span>
                <textarea
                  className="block w-full mt-2 text-sm py-2 outline-none  form-input "
                  placeholder="Enter your address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required
                />
              </label>

              <label className="block mt-4 text-sm after:content-[''] after:absolute relative after:h-[1px] after:w-full after:transition-all after:duration-300 after:bg-color-red after:bottom-0 after:left-0  ">
                <span className="text-gray-700">Password</span>
                <input
                  type="password"
                  className="block w-full mt-2 text-sm outline-none focus:border-red-400 form-input"
                  placeholder="***************"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </label>
              <label className="block mt-4 text-sm after:content-[''] after:absolute relative after:h-[1px] after:w-full after:transition-all after:duration-300 after:bg-color-red after:bottom-0 after:left-0  ">
                <span className="text-gray-700">Confirm password</span>
                <input
                  type="password"
                  className="block w-full mt-2 text-sm py-2 outline-none  form-input "
                  placeholder="***************"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
              </label>
              <div className="flex mt-6 text-sm">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    className="text-red-500 form-checkbox focus:border-red-400"
                    onChange={() => setAcceptPolicy(!acceptPolicy)}
                    value={acceptPolicy}
                    required
                  />
                  <span className="ml-2">
                    I agree to the{" "}
                    <span className="underline">privacy policy</span>
                  </span>
                </label>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>
            <div
              className="text-sm font-bold text-red-500 hover:underline cursor-pointer"
              onClick={showLoginModalHandler}
            >
              &nbsp; Login
            </div>
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

      {/* Login Modal */}
      <LoginModal
        setShowModal={setShowLoginModal}
        showModal={showLoginModal}
        setRegisterModal={setShowModal}
        setIsUserAuthenticated={setIsUserAuthenticated}
      />
    </>
  );
};

export default RegisterModal;
