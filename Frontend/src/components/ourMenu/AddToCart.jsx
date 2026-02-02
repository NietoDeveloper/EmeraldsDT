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
      ]);
    }

    setTotalPrice((prev) => prev + price);
  };

  const handleRemoveIngredient = (name, price) => {
    const existingIngredient = allIngredients.find(
      (ingredient) => ingredient.name === name
    );

    if (existingIngredient && existingIngredient.quantity > 1) {
      setAllIngredients((prev) =>
        prev.map((ingredient) =>
          ingredient.name === name
            ? { ...ingredient, quantity: ingredient.quantity - 1 }
            : ingredient
        )
      );
    } else if (existingIngredient) {
      setAllIngredients((prev) =>
        prev.filter((ingredient) => ingredient.name !== name)
      );
    }


          <div className="w-full lg:mt-2 mt-10  menupage grid gap-10 lg:grid-cols-2 grid-cols-1 px-5 ">
            <div className="mt-5">
              {defaultIngredients &&
                defaultIngredients.map((defaultIngredient, index) => (
                  <div key={index} className="flex justify-between w-full my-4">
                    <p>{defaultIngredient.name}</p>
                    <div
                      className="flex items-center py-2 px-5  rounded-full bg-red-100 gap-3"
                      onClick={() => toggleIngredient(defaultIngredient)}
                    >
                      <p className="max-sm:text-sm">
                        No {defaultIngredient.name}
                      </p>
                      {allIngredients.find(
                        (i) => i.name === defaultIngredient.name
                      ) ? (
                        <IoCheckmarkCircle className="text-green-500 text-2xl" />
                      ) : (
                        <IoMdClose className="text-red-500 text-2xl" />
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-5">
              {selectedItem?.ingredients?.map((ingredient, index) => (
                <div key={index} className="flex justify-between w-full my-4">
                  <p>{ingredient.name}</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-6 w-6  flex items-center cursor-pointer justify-center"
                      onClick={() =>
                        handleRemoveIngredient(
                          ingredient.name,
                          ingredient.price
                        )
                      }
                    >
                      <FaMinus className="text-white" />
                    </div>
                    <p className="font-bold">
                      {allIngredients?.find((i) => i.name === ingredient.name)
                        ?.quantity || 0}
                    </p>
                    <div
                      className="h-6 w-6 flex items-center cursor-pointer justify-center"
                      onClick={() =>
                        handleAddIngredient(ingredient.name, ingredient.price)
                      }
                    >
                      <FaPlus className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            id="details-modal-btn"
            onClick={addToCart}
            className={`bg-color-red w-[200px] h-12 rounded-md block mx-auto mt-10 text-white ${
              loading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {loading ? "Loading..." : "Add to Cart"}
          </button>
        </div>

        <div
          className="h-8 w-8 bg-red-500 rounded-full menupage absolute top-20 right-10 -translate-x-1/2 flex items-center cursor-pointer justify-center"
          onClick={closeModal}
        >
          <IoMdClose className="text-white" />
        </div>
      </div>
    </>
  );
};

export default AddToCart;
