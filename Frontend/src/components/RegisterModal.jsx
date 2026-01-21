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
     
                <input
                  type="text"
                  className="block w-full mt-2 text-sm py-2 outline-none  form-input "
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
             
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
