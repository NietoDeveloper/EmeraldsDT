import React from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const UserSignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/user/register", {
      name,
      email,
      password,
      phone,
      address,
    });
    toast.success(data?.message);
    localStorage.setItem("userId", data?.user?._id);
    navigate("/user");
  };
  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center h-screen w-full mt-20">
        <div className="w-full mt-5 bg-white rounded shadow-lg p-8 m-4 md:max-w-xl md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            User SignUp
          </span>
          <form className="mb-4" onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-5">
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Name
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Phone
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>

            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">
                Email
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">
                Address
              </label>
              <textarea
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="password" className="block text-xs mb-1">
                Password
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <p className="mb-4">
              If already have an account?{" "}
              <Link className="text-blue-700 hover:underline" to="/userLogin">
                Login
              </Link>{" "}
              here.{" "}
            </p>

            <button
              type="submit"
              className="bg-color-red text-white uppercase text-sm font-semibold px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
