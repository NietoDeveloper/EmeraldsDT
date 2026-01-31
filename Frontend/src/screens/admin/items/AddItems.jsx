import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import toast from "react-hot-toast";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [calories, setCalories] = useState("");
  const [nutrition, setNutrition] = useState([
    { name: "Saturated Fat", value: "" },
    { name: "Total Sugars", value: "" },
    { name: "Vitamin D", value: "" },
    { name: "Dietary Fiber", value: "" },
    { name: "Added Sugars", value: "" },
    { name: "Potassium", value: "" },
    { name: "Calcium", value: "" },
    { name: "Iron", value: "" },
    { name: "Sodium", value: "" },
    { name: "Trans Fat", value: "" },
    { name: "Cholesterol", value: "" },
  ]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data } = await axios.get("/ingredient/read/all");
        setIngredients(data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIngredients();
  }, []);

  const handleNutritionChange = (index, value) => {
    const updatedNutrition = [...nutrition];
    updatedNutrition[index].value = value;
    setNutrition(updatedNutrition);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/admin/getCategory");
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Item Name is required";
    }
    if (!price.trim()) {
      newErrors.price = "Item Price is required";
    }
    if (!description.trim()) {
      newErrors.description = "Item Description is required";
    }
    if (!category.trim()) {
      newErrors.category = "Category is required";
    }
    if (!image) {
      newErrors.image = "Image is required";
    }
    if (!calories.trim()) {
      newErrors.calories = "Calories is required";
    }
    if (!protein.trim()) {
      newErrors.protein = "Protein is required";
    }
    if (!carbs.trim()) {
      newErrors.carbs = "Carbs is required";
    }
    if (!fat.trim()) {
      newErrors.fat = "Fat is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;