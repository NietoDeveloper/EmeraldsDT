import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../../utils/axios";
const MySwal = withReactContent(Swal);

const UpdateUser = ({
  toggleModal,
  isOpen,
  user,
  setUser,
  handleInputChange,
}) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/user/update/${user._id}`, user);
      if (data) {
        MySwal.fire({
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300`}
        onClick={toggleModal}
      ></div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 flex items-center justify-center z-10`}
      >
        <div className="bg-white p-6 rounded-lg shadow-xl lg:w-1/2">
          <div className="text-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-center font-hobo text-color-red">
              Update Profile
            </h1>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="itemName"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleInputChange} // Use handleInputChange function
                  value={user?.name}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleInputChange} // Use handleInputChange function
                  value={user?.email}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ring-1 ring-black"
                  id="address"
                  type="text"
                  name="address"
                  onChange={handleInputChange} // Use handleInputChange function
                  value={user?.address}
                />
              </div>

              <div className="w-full flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="py-2 cursor-pointer px-5 rounded-xl bg-black text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 cursor-pointer px-5 rounded-xl bg-color-red text-white"
                >
                  Update
                  {/* {loading ? "Updating..." : "Update"} */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
