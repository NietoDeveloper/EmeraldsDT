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



