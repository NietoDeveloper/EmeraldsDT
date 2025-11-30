import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "../../utils/axios";
import { useLocation } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";

const DashboardView = () => {
  const UserData = [
    {
      id: 1,
      name: "Total Users",
      userGain: 100,
    },
    {
      id: 2,
      name: "Total Orders",
      userGain: 200,
    },
    {
      id: 3,
      name: "Total Products",
      userGain: 300,
    },
    {
      id: 4,
      name: "All Details",
      userGain: 400,
    },
  ];

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.name),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "All Details",
      },
    },
  };

  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data } = await axios.get("/admin/getAdmin");
        setAdminData(data?.admin[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminData();
  }, []);

  const switchOffOrder = async (id) => {
    try {
      const { data } = await axios.post(`/admin/updateAdmin/${id}`, {
        orderAccept: false,
      });
      setAdminData(data?.admin);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const switchOnOrder = async (id) => {
    try {
      const { data } = await axios.post(`/admin/updateAdmin/${id}`, {
        orderAccept: true,
      });
      setAdminData(data?.admin);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const locaton = useLocation();
  return (
    <>
      <div className="main mt-8">
        {locaton.pathname === "/admin/dashboardView" && (
          <div className="w-full flex justify-end">
            {adminData?.orderAccept ? (
              <button
                className="py-1 px-3 bg-red-600 rounded-xl mb-6 text-white flex items-center space-x-1"
                onClick={() => switchOffOrder(adminData?._id)}
              >
                <FaUnlock />
                <span>Switch Off Order</span>
              </button>
            ) : (
              <button
                className="py-1 px-3 bg-green-600 rounded-xl mb-6 text-white flex items-center space-x-1"
                onClick={() => switchOnOrder(adminData?._id)}
              >
                <FaLock />
                <span>Switch On Order</span>
              </button>
            )}
          </div>
        )}

        <div className="cardBox grid grid-cols-4 mb-7 gap-4">
          {UserData.map((data) => (
            <div
              key={data.id}
              className="card relative bg-white shadow-sm shadow-color-red p-6 rounded-lg flex justify-between cursor-pointer transition duration-500 ease-in-out transform hover:scale-105"
            >
              <div>
                <div className="numbers text-blue-500 text-2xl font-semibold">
                  {data.userGain}
                </div>
                <div className="cardName text-black2 text-sm mt-2">
                  {data.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Bar data={userData} options={options} />
          </div>
          <div>
            <Pie
              data={userData}
              options={{
                ...options,
                style: { width: "280px", height: "280px" },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
