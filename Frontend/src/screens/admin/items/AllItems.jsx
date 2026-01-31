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

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/admin/getItem");
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/admin/getCategory");
        const categoryData = {};
        data.categories.forEach((category) => {
          categoryData[category._id] = category.category;
        });
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const deleteHandler = async (itemId) => {
    try {
      await MySwal.fire({
        title: "Are you sure?",
        text: "You want to delete this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.post(`/admin/deleteItem/${itemId}`);
          setData((prevData) => ({
            ...prevData,
            items: prevData?.items?.filter((item) => item._id !== itemId),
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
