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
