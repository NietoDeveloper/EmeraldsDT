import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import AddToCart from "./AddToCart";

const Items = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

