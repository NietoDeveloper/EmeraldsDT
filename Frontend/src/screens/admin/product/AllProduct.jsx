import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdateModel from "./UpdateModel";

const MySwal = withReactContent(Swal);

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const locaton = useLocation();
  const toggleModal = (product) => {
    setIsOpen(!isOpen);
    setSelectedProduct(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("product/getProducts");
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteHandler = async (productId) => {
    try {
      await MySwal.fire({
        title: "Are you sure?",
        text: "You want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`product/deleteProduct/${productId}`);
          setProducts((prevData) => ({
            ...prevData,
            products: prevData?.products?.filter(
              (product) => product._id !== productId
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
        marchandisePermission: true,
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
        marchandisePermission: false,
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
        All prdoucts
      </h1>
      <div className="grid grid-cols-4 gap-10">
        {locaton.pathname === "/admin/allMerchandise" &&
          subAdmin &&
          subAdmin.map((subAdmin, index) => (
            <div
              key={index}
              className="w-fit py-2 rounded-lg px-3 mb-7 flex bg-red-50 justify-end flex-col"
            >
              <h1 className="font-semibold">Email:- {subAdmin?.email} </h1>

              {subAdmin?.marchandisePermission ? (
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
                  Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Stock
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
              {products &&
                products.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <h6 className="font-bold">{index + 1}.</h6>
                    </td>
                    <th className="px-6 py-4 whitespace-nowrap">
                      <div className="h-20 w-24 rounded-md bg-blue-200 overflow-hidden">
                        <img
                          className="h-full w-full object-cover"
                          src={product.image.url}
                          alt=""
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">€ {product.price}</td>

                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      {" "}
                      <Link
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                        onClick={() => toggleModal(product)}
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
                          onClick={() => deleteHandler(product._id)}
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
        toggleModal={toggleModal}
        isOpen={isOpen}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default AllProduct;
