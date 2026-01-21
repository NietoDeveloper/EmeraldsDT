import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "../utils/axios";
import AddToCart from "../components/ourMenu/AddToCart";
import { useNavigate } from "react-router-dom";

const Merchandise = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const { data } = await axios.get("/product/getProducts");
        setMenuItems(data.products);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
oduct(item)}
                />
                <p className="text-center lg:text-[18px] text-sm mt-3">
                  {item.name}
                </p>
                <div
                  className="h-8 w-8  absolute lg:top-1/2   right-0  lg:translate-x-[-30%] top-[40%] translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer justify-center"
                  onClick={() => handleModalShow({ item: item })}
                >
                  <FaPlus className="text-[#bebebe]" />
                </div>
                <div className="h-8 w-8 absolute lg:top-1/2 left-6 lg:-translate-x-1/2 -translate-x-full -translate-y-1/2 top-[40%] flex items-center cursor-pointer justify-center">
                  <FaMinus className="text-[#bebebe]" />
                </div>
              </div>
            ))}
          </div>
        )}
        <Footer />
      </div>

      <AddToCart
        showModal={showModal}
        closeModal={closeModel}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Merchandise;
