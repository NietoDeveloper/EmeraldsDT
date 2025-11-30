import React from "react";
import img1 from "../../assets/Menu1.png";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import NewNews from "./NewNews";

const Menu = () => {
  return (
    <div className="h-[auto] w-full flex flex-col items-end relative lg:mt-24 mt-10">
      <div className=" w-full lg:px-10 px-5 lg:pr-5 relative">
        <MenuItems />
      </div>
      <NewNews />
    </div>
  );
};

export default Menu;
