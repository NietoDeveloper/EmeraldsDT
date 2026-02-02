import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateModel = ({ toggleModal, isOpen, selectedCategory }) => {
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryPosition, setCategoryPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (categoryName !== "") formData.append("category", categoryName);
    if (categoryImage !== null) formData.append("image", categoryImage);
    if (categoryPosition !== "") formData.append("position", categoryPosition);

    try {
      setLoading(true);

      const { data } = await axios.post(
        `/admin/updateCategory/${selectedCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        MySwal.fire({
          icon: "success",
          title: "Item Updated Successfully",
        });

  return (
    <>




s
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModel;
