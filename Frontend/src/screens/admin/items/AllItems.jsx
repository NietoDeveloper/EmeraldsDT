import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdateModal from "./UpdateModal";

const MySwal = withReactContent(Swal);

const AllItems = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [subAdmin, setSubAdmin] = useState([]);

  const toggleModal = (item) => {
    setIsOpen(!isOpen);
    setSelectedItem(item);
  };

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/admin/getItem");
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/admin/getCategory");
        const categoryData = {};
        data.categories.forEach((category) => {
          categoryData[category._id] = category.category;
        });
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const deleteHandler = async (itemId) => {
    try {
      await MySwal.fire({
        title: "Are you sure?",
        text: "You want to delete this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.post(`/admin/deleteItem/${itemId}`);
          setData((prevData) => ({
            ...prevData,
            items: prevData?.items?.filter((item) => item._id !== itemId),
          }));

          await MySwal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const SubadminAccessHandler = async (id) => {
    try {
      await axios.post(`/admin/updateSubAdmin/${id}`, {
        itemPermission: true,
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
        itemPermission: false,
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

  let increment = 0;

  // console.log(subAdmin);

  return (
    <>
      <h1 className="text-2xl mt-10 font-bold mb-4 text-center font-hobo text-color-red">
        All Items
      </h1>

      <div className="grid grid-cols-4 gap-10">
        {location.pathname === "/admin/allItems" &&
          subAdmin &&
          subAdmin.map((suba, index) => (
            <div
              key={index}
              className="w-fit py-2 rounded-lg px-3 mb-7 flex bg-red-50 justify-end flex-col"
            >
              <h1 className="font-semibold">Email:- {suba?.email} </h1>

              {suba?.itemPermission ? (
                <button
                  type="submit"
                  className="bg-color-red mt-3 text-white px-2 rounded-lg"
                  onClick={() => SubadminRemoveAccessHandler(suba?._id)}
                >
                  Remove Access
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 mt-3 text-white px-2 rounded-lg"
                  onClick={() => SubadminAccessHandler(suba?._id)}
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
                  Item Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Category
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
              {Object.keys(categories).map((categoryId) => {
                const categoryItems = data.items.filter(
                  (item) => item.category === categoryId
                );
                if (categoryItems.length === 0) return null;
                return (
                  <React.Fragment key={categoryId}>
                    {/* <tr className="bg-gray-200">
                      <td colSpan="7" className="font-bold px-6 py-4">
                        {categories[categoryId]}
                      </td>
                    </tr> */}
                    {categoryItems.map((item, index) => (
                      <tr key={item._id} className="border-b hover:bg-gray-100">
                        <td className="px-6 py-4">
                          <h6 className="font-bold">
                            {(increment = increment + 1)}.
                          </h6>
                        </td>
                        <th className="px-6 py-4 whitespace-nowrap">
                          <div className="h-20 w-24 rounded-md bg-blue-200 overflow-hidden">
                            <img
                              className="h-full w-full object-cover"
                              src={item.image.url}
                              alt=""
                            />
                          </div>
                        </th>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">€ {item.price}</td>
                        <td className="px-6 py-4">
                          {categories[item.category]}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href="#"
                            className="font-medium text-blue-600 hover:underline"
                            onClick={() => toggleModal(item)}
                          >
                            Update
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <MdDelete
                            className="text-2xl text-color-red cursor-pointer"
                            onClick={() => deleteHandler(item._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <UpdateModal
        toggleModal={toggleModal}
        isOpen={isOpen}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default AllItems;
