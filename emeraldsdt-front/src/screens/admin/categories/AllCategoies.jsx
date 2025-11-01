import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdateModel from "./UpdateModel";

const MySwal = withReactContent(Swal);

const AllCategoies = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelctedCategory] = useState({});

  const locaton = useLocation();

  const toggleModal = (cat) => {
    setIsOpen(!isOpen);
    setSelctedCategory(cat);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/admin/getCategory");
        const sortadCategory = data.categories.sort(
          (a, b) => a.position - b.position
        );
        setData({ ...data, categories: sortadCategory });
        // console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (categoryId) => {
    try {
      // Check if there are any items associated with the category
      const { data } = await axios.get(
        `/admin/getItemByCategory/${categoryId}`
      );
      const itemsCount = data.items.length;

      if (itemsCount === 0) {
        // If no items associated, directly delete the category
        await confirmAndDeleteCategory(categoryId);
      } else {
        // If items associated, show alert
        await MySwal.fire({
          title: "Warning!",
          text: `There are ${itemsCount} item(s) associated with this category. You must delete these items before deleting the category.`,
          icon: "warning",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmAndDeleteCategory = async (categoryId) => {
    try {
      // Show confirmation dialog
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You want to delete this category!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If confirmed, delete the category
      if (result.isConfirmed) {
        await axios.delete(`/admin/deleteCategory/${categoryId}`);
        // Update the state to remove the deleted category
        setData((prevData) => ({
          ...prevData,
          categories: prevData.categories.filter(
            (category) => category._id !== categoryId
          ),
        }));

        // Show success message
        await MySwal.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [subAdmin, setSubAdmin] = useState([]);

  useEffect(() => {
    const getSubadmin = async () => {
      try {
        const { data } = await axios.get("/admin/subAdmin");
        setSubAdmin(data.subadmin);
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    getSubadmin();
  }, []);

  // console.log(subAdmin);

  const SubadminAccessHandler = async (id) => {
    try {
      await axios.post(`/admin/updateSubAdmin/${id}`, {
        categoryPermission: true,
      });
      await MySwal.fire({
        title: "Access Given!",
        text: "Subadmin can now access the Items!",
        icon: "success",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const SubadminRemoveAccessHandler = async (id) => {
    try {
      await axios.post(`/admin/updateSubAdmin/${id}`, {
        categoryPermission: false,
      });
      await MySwal.fire({
        title: "Access Removed!",
        text: "Subadmin can't access the Items now!",
        icon: "success",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl mt-10 font-bold mb-10 text-center font-hobo text-color-red">
        All Categories
      </h1>

      <div className="grid grid-cols-4 gap-10">
        {locaton.pathname === "/admin/allCategories" &&
          subAdmin &&
          subAdmin.map((subAdmin, index) => (
            <div
              key={index}
              className="w-fit py-2 rounded-lg px-3 mb-7 flex bg-red-50 justify-end flex-col"
            >
              <h1 className="font-semibold">Email:- {subAdmin?.email} </h1>

              {subAdmin?.categoryPermission ? (
                <button
                  type="submit"
                  className="bg-color-red mt-3 text-white px-2 rounded-lg"
                  onClick={() => SubadminRemoveAccessHandler(subAdmin?._id)}
                >
                  Remove Access
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 mt-3 text-white px-2 rounded-lg"
                  onClick={() => SubadminAccessHandler(subAdmin?._id)}
                >
                  Give Access
                </button>
              )}
            </div>
          ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-start mt-20 h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-color-red"></div>
        </div>
      ) : (
        <div className="relative w-full d-block mx-auto overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 w-28">
                  SR. NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  Category Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Update
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.categories &&
                data.categories.map((cat, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <h6 className="font-bold">{index + 1}.</h6>
                    </td>
                    <th className="px-6 py-4 whitespace-nowrap">
                      <div className="h-20 w-24 rounded-md bg-blue-200 overflow-hidden">
                        <img
                          className="h-full w-full object-cover"
                          src={cat.image.url}
                          alt=""
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4">{cat.category}</td>
                    <td className="px-6 py-4">
                      {" "}
                      <Link
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                        onClick={() => toggleModal(cat)}
                      >
                        Update
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        <MdDelete
                          className="text-2xl text-red-700 cursor-pointer"
                          onClick={() => deleteHandler(cat._id)}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <UpdateModel
        isOpen={isOpen}
        toggleModal={toggleModal}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default AllCategoies;
