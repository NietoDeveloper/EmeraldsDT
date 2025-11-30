import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

import DataStore from "./ContexApi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataStore>
      <App />
      <Toaster position="top-center" reverseOrder={true}  />
    </DataStore>
  </React.StrictMode>
);
