import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
   if (email === "" || password === "") {
      toast.error("Please fill in the form");
    } 
     else {
      try {
        const { data } = await axios.post("/user/login", {
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("userId", data?.user?._id);
          localStorage.setItem("userToken", data?.token);
          window.location.href = "/user";
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      window.location.href = "/user";
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen w-full mt-20">
        <div className="w-full mt-5 bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            User Login
          </span>
          <form className="mb-4" onSubmit={submitHandler}>
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">
                Email
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Username or Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
              Don't have an account?{" "}
              <Link className="text-blue-700 hover:underline" to="/userSingup">
                Signup
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

export default UserLogin;
