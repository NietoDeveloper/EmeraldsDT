import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation } from "react-router-dom";

const MySwal = withReactContent(Swal);

const AllBanner = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [subAdmin, setSubAdmin] = useState([]);
  const locaton = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/admin/getBanner");
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (bannerId) => {
    try {
      await MySwal.fire({
        title: "Are you sure?",
        text: "You want to delete this banner!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.post(`/admin/deleteBanner/${bannerId}`);
          setData((prevData) => ({
            ...prevData,
            banners: prevData?.banners?.filter(
              (banner) => banner._id !== bannerId
            ),
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

  // console.log(subAdmin);

  const SubadminAccessHandler = async (id) => {
    try {
      await axios.post(`/admin/updateSubAdmin/${id}`, {
        bannerPermission: true,
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
        bannerPermission: false,
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
        All Banner
      </h1>

      <div className="grid grid-cols-4 gap-10">
        {locaton.pathname === "/admin/allBanner" &&
          subAdmin &&
          subAdmin.map((subAdmin, index) => (
            <div
              key={index}
              className="w-fit py-2 rounded-lg px-3 mb-7 flex bg-red-50 justify-end flex-col"
            >
              <h1 className="font-semibold">Email:- {subAdmin?.email} </h1>

              {subAdmin?.bannerPermission ? (
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
        <div className="relative w-4/5 d-block mx-auto overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 w-28">
                  SR. NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  Banner Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Banner Heading
                </th>
                <th scope="col" className="px-6 py-3">
                  Banner Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.banners &&
                data.banners.map((banner, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <h6 className="font-bold">{index + 1}.</h6>
                    </td>
                    <th className="px-6 py-4 whitespace-nowrap">
                      <div className="h-20 w-24 rounded-md  overflow-hidden">
                        <img
                          className="h-full w-full object-cover"
                          src={banner.banners.url}
                          alt=""
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4">{banner.banners.head}</td>
                    <td className="px-6 py-4">{banner.banners.content}</td>
                    <td className="px-6 py-4 text-right">
                      <MdDelete
                        className="text-2xl text-color-red cursor-pointer"
                        onClick={() => deleteHandler(banner._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllBanner;
