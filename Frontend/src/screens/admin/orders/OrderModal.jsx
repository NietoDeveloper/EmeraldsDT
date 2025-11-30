import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "../../../utils/axios";
import toast from "react-hot-toast";

const OrderModal = ({ setShowModal, showModal, selectedOrder }) => {
  // console.log(selectedOrder, "jkdfjd");

  const AcceptHandler = async (userId, orderId) => {
    const { data } = await axios.post(`/user/accpetOrder/${userId}/${orderId}`);
    toast.success(data.message);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center h-full bg-gray-400 bg-opacity-50 transition-all duration-300 ease-linear  ${
        showModal ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-[85%] h-[85%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-4 mx-auto bg-white overflow-auto rounded-3xl shadow-md shadow-color-red pointer-events-auto transition-all duration-300 delay-200 ${
          showModal ? "scale-100" : "scale-0"
        } `}
      >
        <div className="mb-4 text-lg font-bold text-center text-gray-700">
          Order Details
        </div>
        <div className="px-4 py-3 mb-8">
          <div className="relative w-full d-block mx-auto overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3 w-28">
                    SR. NO.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Order Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Quantity
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Order Ingredients
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder &&
                  selectedOrder?.orders?.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 ">
                          #{order._id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <img
                            src={order.image}
                            alt={order.name}
                            className="w-20 h-20 "
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.totalPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.quantity}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order?.ingredients?.length > 0 ? (
                            order?.ingredients.map((ingredient, index) => (
                              <span
                                key={index}
                                className="mr-2 relative flex flex-col gap-4"
                              >
                                {index + 1}. {ingredient.name}{" "}
                                <div className="absolute bg-color-red h-4  w-4 rounded-full text-white flex items-center justify-center text-[8px] -top-3 -right-5">
                                  {ingredient.quantity}
                                </div>
                              </span>
                            ))
                          ) : (
                            <span>No Ingredients</span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.status === "Accepted" ? (
                            <button
                              onClick={() =>
                                AcceptHandler(selectedOrder._id, order._id)
                              }
                              className="px-3 py-1 bg-green-500 text-white rounded-md"
                            >
                              Accepted
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                AcceptHandler(selectedOrder._id, order._id)
                              }
                              className="px-3 py-1 bg-red-500 text-white rounded-md"
                            >
                              Pending
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Close Model Icon */}
      <div
        className="absolute top-0 right-0 mt-10 mr-10 cursor-pointer h-10 w-10 rounded-full bg-color-red flex justify-center items-center hover:bg-red-400 transition-all duration-300 delay-200 ease-out"
        onClick={() => setShowModal(false)}
      >
        <IoClose className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default OrderModal;
