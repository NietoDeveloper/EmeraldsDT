import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailSubAdmin, setEmailSubAdmin] = React.useState("");
  const [passwordSubAdmin, setPasswordSubAdmin] = React.useState("");
  const [subAdmin, setSubAdmin] = React.useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/admin/adminSignin", {
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/dashboardView");
      }

      localStorage.setItem("adminToken", data.token);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const submitHandlerSubAdmin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/admin/subAdminSignin", {
        email: emailSubAdmin,
        password: passwordSubAdmin,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/subAdmin/dashboardView");
      }

      localStorage.setItem("subAdminId", data.data._id);
      localStorage.setItem("subAdminToken", data.token);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin/dashboardView");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("subAdminToken")) {
      navigate("/subAdmin/dashboardView");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen w-full mt-20">
        <div className="w-full gap-10 flex justify-center">
          <div
            className="h-full w-40 bg-color-red flex items-center justify-center"
            onClick={() => setSubAdmin(false)}
          >
            <h1 className="text-xl font-semibold text-white py-3 px-5 cursor-pointer">
              Admin
            </h1>
          </div>
          <div
            className="h-full w-40 bg-color-red flex items-center justify-center"
            onClick={() => setSubAdmin(true)}
          >
            <h1 className="text-xl font-semibold text-white py-3 px-5 cursor-pointer">
              Subadmin
            </h1>
          </div>
        </div>

        {subAdmin ? (
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">
              Sub-Admin Login
            </span>
            <form className="mb-4" onSubmit={submitHandlerSubAdmin}>
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Username or Email
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Username or Email"
                  onChange={(e) => setEmailSubAdmin(e.target.value)}
                  value={emailSubAdmin}
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
                  onChange={(e) => setPasswordSubAdmin(e.target.value)}
                  value={passwordSubAdmin}
                />
              </div>
              <button
                type="submit"
                className="bg-color-red text-white uppercase text-sm font-semibold px-4 py-2 rounded"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full mt-5 bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">
              Admin Login
            </span>
            <form className="mb-4" onSubmit={submitHandler}>
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Username or Email
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
              <button
                type="submit"
                className="bg-color-red text-white uppercase text-sm font-semibold px-4 py-2 rounded"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Signin;
