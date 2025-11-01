import axios from "../../../utils/axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdateModel from "./UpdateModel";

const MySwal = withReactContent(Swal);
const AllNewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNews, setSelctedNews] = useState({});
  const locaton = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/news/readNews");
        setNews(data.news);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (newsId) => {
    try {
      await MySwal.fire({
        title: "Are you sure?",
        text: "You want to delete this news!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/news/deleteNews/${newsId}`);
          setNews((prevNews) => prevNews.filter((item) => item._id !== newsId));

          await MySwal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (news) => {
    setIsOpen(!isOpen);
    setSelctedNews(news);
  };

  const fromateDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
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
        newsPermission: true,
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
        newsPermission: false,
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
        All News & Events
      </h1>

      <div className="grid grid-cols-4 gap-10">
        {locaton.pathname === "/admin/allNews" &&
          subAdmin &&
          subAdmin.map((subAdmin, index) => (
            <div
              key={index}
              className="w-fit py-2 rounded-lg px-3 mb-7 flex bg-red-50 justify-end flex-col"
            >
              <h1 className="font-semibold">Email:- {subAdmin?.email} </h1>

              {subAdmin?.newsPermission ? (
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
        <p>Loading...</p>
      ) : (
        <div className="relative w-full d-block mx-auto overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 w-28">
                  SR. NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  News Image
                </th>
                <th scope="col" className="px-6 py-3">
                  News Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  News Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {news &&
                news?.map((news, index) => (
                  <tr key={news._id}>
                    <td className="px-6 py-4">
                      <h6 className="font-bold">{index + 1}.</h6>
                    </td>
                    <th className="px-6 py-4 whitespace-nowrap">
                      <div className="h-20 w-24 rounded-md bg-blue-200 overflow-hidden">
                        <img
                          className="h-full w-full object-cover"
                          src={news?.image?.url}
                          alt=""
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4">{news.title}</td>
                    <td className="px-6 py-4">{fromateDate(news.date)}</td>
                    <td className="px-6 py-4">{news.description}</td>
                    <td className="px-6 py-4 ">
                      {news.featured ? "Featured" : "Non-Featured"}
                    </td>

                    <td className="px-6 py-4">
                      {" "}
                      <Link
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                        onClick={() => toggleModal(news)}
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
                          className="text-2xl text-color-red cursor-pointer"
                          onClick={() => deleteHandler(news._id)}
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
        selectedNews={selectedNews}
      />
    </>
  );
};

export default AllNewsAdmin;
