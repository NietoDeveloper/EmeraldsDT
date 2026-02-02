import { useState, useEffect } from "react";
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

  ];

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.name),
    datasets: [
      {
        borderWidth: 1,
      },
    ],
  });


        display: true,
        text: "All Details",
      },
    },
  };

  const [adminData, setAdminData] = useState({});

    fetchAdminData();
  }, []);



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
