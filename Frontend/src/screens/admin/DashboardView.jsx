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

ame="cardName text-black2 text-sm mt-2">
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
