import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "../../utils/axios";
import Footer from "../../components/Footer";
import UpdateUser from "./UpdateUser";


  const UserProfile = () => {
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);

    if (!userId) {
      window.location.href = "/";
    }
  }, []);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/user/${userId}`);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/userLogin";
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const UpdateProfile = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div style={{ maxWidth: "1600px" }} className="mx-auto">
        <Navbar />

        <div className="w-full flex max-sm:flex-col z-0 lg:pt-44 pt-20 pb-10 lg:px-40 px-5 lg:pl-52">
          <div className="lg:w-1/4 h-full">
            <div className="bg-white rounded-xl shadow-xl py-8 px-3">
              <div className="flex justify-center items-center h-32">
                <div className="w-32 h-32 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src="https://avatar.iran.liara.run/public/boy?username=Ash"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex mt-6 flex-col items-center justify-center">
                <p className="text-2xl font-bold">{user?.name}</p>
                <p className="text-sm mt-2">
                  <span className="text-red-500">
                    email: <b>{user?.email}</b>{" "}
                  </span>
                </p>
                <p className="text-sm mt-2">
                  <span>
                    Address : <b>{user?.address}</b>{" "}
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white py-4 px-5 rounded-xl shadow-xl mt-4">
              <div className="flex items-center justify-center gap-4">
                <button
                  className="py-1 px-3 bg-color-red border-0 rounded-md text-white font-semibold"
                  onClick={handleLogout}
                >
                  Log Out
                </button>

                <button
                  className="py-1 px-3 bg-green-600 border-0 rounded-md text-white font-semibold"
                  onClick={UpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 w-full max-sm:mt-10 lg:px-5 h-full">
            <h1 className="text-center text-2xl font-bold text-color-red">
              All Orders
            </h1>
            <div className="overflow-x-auto">
              <table className="w-full mt-10 bg-zinc-100 text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      SR. NO.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.orders?.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{index + 1}.</td>
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            className="h-full w-full object-cover"
                            src={order?.image}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">{order?._id}</td>
                      <td className="px-6 py-4">{order?.name}</td>
                      <td className="px-6 py-4">{order?.quantity}</td>
                      <td className="px-6 py-4">${order?.totalPrice}</td>
                      <td className="px-6 py-4">{order?.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="lg:px-40 lg:mt-44 px-1">
          <Footer />
        </div>
      </div>
      <UpdateUser
        isOpen={isOpen}
        toggleModal={toggleModal}
        user={user}
        setUser={setUser}
        handleInputChange={handleInputChange}
      />
    </>
  );
};

export default UserProfile;
