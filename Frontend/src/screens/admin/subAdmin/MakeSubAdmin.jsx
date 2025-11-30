import axios from "../../../utils/axios";
import React from "react";
import toast from "react-hot-toast";

const MakeSubAdmin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("subAdmin");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill in the form");
    } else {
      try {
        const { data } = await axios.post("/admin/subAdminSignup", {
          email,
          password,
          role,
        });
        if (data.success) {
          toast.success(data.message);
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full  mt-20">
      <div className="w-full mt-5 bg-white rounded shadow-lg p-8 m-4 md:max-w-xl md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Make Sub Admin
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
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Role
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="role"
              id="role"
              placeholder="sub-admin"
              disabled
            />
          </div>
          <button
            type="submit"
            className="bg-color-red text-white uppercase text-sm font-semibold px-4 py-2 rounded"
          >
            Make Sub Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeSubAdmin;
