import React, { useState, useEffect, useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { DataContext } from "../../ContexApi";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const AddToCart = ({ showModal, closeModal, selectedItem }) => {
  const [loading, setLoading] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [initialItemPrice, setInitialItemPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { setExistingCartContext } = useContext(DataContext);
  const [spicynonspicy, setSpicyNonSpicy] = useState(false);
  const [defaultIngredients, setDefaultIngredients] = useState([]);

  const oneProductIdFromLocalStorage = localStorage.getItem("oneProductId");

  // console.log("selectedItem", selectedItem);

  useEffect(() => {
    setTotalPrice(selectedItem?.item?.price * quantity);
    setInitialItemPrice(selectedItem?.item?.price);
  }, [selectedItem, quantity]);

  useEffect(() => {
    if (selectedItem) {
      const defaultIngredients = selectedItem?.ingredients
        ?.filter((ingredient) => ingredient.price <= 0)
        .map((ingredient) => ({ ...ingredient, quantity: 1 }));
      setDefaultIngredients(defaultIngredients);
      setAllIngredients(defaultIngredients);
    }
  }, [selectedItem]);

  const handleAddIngredient = (name, price) => {
    const existingIngredient = allIngredients.find(
      (ingredient) => ingredient.name === name
    );

    // if the ingredient's price is 0, then user can't add more than 3 of it
    if (existingIngredient && price === 0 && existingIngredient.quantity >= 3) {
      toast.error("You can't add more than 3 of this ingredient");
      return;
    }

    if (existingIngredient) {
      const updatedIngredients = allIngredients.map((ingredient) =>
        ingredient.name === name
          ? { ...ingredient, quantity: (ingredient.quantity || 0) + 1 }
          : ingredient
      );
      setAllIngredients(updatedIngredients);
    } else {
      setAllIngredients((prev) => [
        ...prev,
        { name: name, price: price, quantity: 1 }, // Initialize quantity to 1


          

            <div className="mt-5">
              {selectedItem?.ingredients?.map((ingredient, index) => (

export default AddToCart;
