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

      <UpdateModal
        toggleModal={toggleModal}
        isOpen={isOpen}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default AllItems;
