import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import AddToCart from "./AddToCart";
import axios from "../../utils/axios";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedItem, setSelectedItem] = useState({});
  const [loading, setLoading] = useState(true);



  const navigate = useNavigate();

  const closeModel = (e) => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/admin/getItem");



export default Main;
