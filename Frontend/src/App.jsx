import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hompage from "./screens/Hompage";
import OurMenu from "./screens/OurMenu";
import Admin from "./screens/admin/Admin";
import DashboardView from "./screens/admin/DashboardView";
import AddItems from "./screens/admin/items/AddItems";
import Signin from "./screens/admin/Signin";
import Merchandise from "./screens/Merchandise";
import AllItems from "./screens/admin/items/AllItems";
import AddBanner from "./screens/admin/banner/AddBanner";
import AllBanner from "./screens/admin/banner/AllBanner";
import Contact from "./components/Contact";
import Items from "./components/ourMenu/Items";
import Main from "./components/ourMenu/Main";
import AllNews from "./components/AllNews";
import AboutOurFood from "./components/AboutOurFood";

import { Navigate } from "react-router-dom";
import OneItemPage from "./screens/OneItemPage";
import Cart from "./screens/Cart";
import AddCategories from "./screens/admin/categories/AddCategories";
import AllCategoies from "./screens/admin/categories/AllCategoies";
import AllProduct from "./screens/admin/product/AllProduct";
import AddProduct from "./screens/admin/product/AddProduct";
import AddNews from "./screens/admin/news/AddNews";
import AllNewsAdmin from "./screens/admin/news/AllNews";
import AllIngredient from "./screens/admin/ingredient/AllIngredient";
import AddIngredient from "./screens/admin/ingredient/AddIngredient";
import SubAdmin from "./screens/subAdmin/SubAdmin";
import User from "./screens/admin/user/User";
import Orders from "./screens/admin/orders/Orders";
import OneProductPage from "./screens/OneProductPage";
import UserProfile from "./screens/user/UserProfile";
import UserLogin from "./screens/user/UserLogin";
import MakeSubAdmin from "./screens/admin/subAdmin/MakeSubAdmin";
import UserSignUp from "./screens/user/UserSignUp";
import ComingSoon from "./components/ComingSoon";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hompage />} />
          {/* <Route path="/" element={<ComingSoon />} /> */}
          <Route path="/user" element={<UserProfile />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userSingup" element={<UserSignUp />} />
          <Route path="/our-menu" element={<OurMenu />}>
            <Route path="main" element={<Main />} />
            <Route path=":category" element={<Items />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/About" element={<AboutOurFood />} />
          <Route path="/allnews" element={<AllNews />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/merchandise/:id" element={<OneProductPage />} />
          <Route path="/admin/signin" element={<Signin />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboardView" element={<DashboardView />} />
            <Route path="addItems" element={<AddItems />} />
            <Route path="allItems" element={<AllItems />} />
            <Route path="addBanner" element={<AddBanner />} />
            <Route path="allBanner" element={<AllBanner />} />
            <Route path="addCategories" element={<AddCategories />} />
            <Route path="allCategories" element={<AllCategoies />} />
            <Route path="allMerchandise" element={<AllProduct />} />
            <Route path="addMerchandise" element={<AddProduct />} />
            <Route path="allNews" element={<AllNewsAdmin />} />
            <Route path="addNews" element={<AddNews />} />
            <Route path="allIngredient" element={<AllIngredient />} />
            <Route path="addIngredient" element={<AddIngredient />} />
            <Route path="allUser" element={<User />} />
            <Route path="allOrders" element={<Orders />} />
            <Route path="makeSubAdmin" element={<MakeSubAdmin />} />
          </Route>

          <Route path="/subAdmin" element={<SubAdmin />}>
            <Route path="dashboardView" element={<DashboardView />} />
            <Route path="addItems" element={<AddItems />} />
            <Route path="allItems" element={<AllItems />} />
            <Route path="addBanner" element={<AddBanner />} />
            <Route path="allBanner" element={<AllBanner />} />
            <Route path="addCategories" element={<AddCategories />} />
            <Route path="allCategories" element={<AllCategoies />} />
            <Route path="allmerchandise" element={<AllProduct />} />
            <Route path="addmerchandise" element={<AddProduct />} />
            <Route path="allNews" element={<AllNewsAdmin />} />
            <Route path="addNews" element={<AddNews />} />
            <Route path="allIngredient" element={<AllIngredient />} />
            <Route path="addIngredient" element={<AddIngredient />} />
            <Route path="allUser" element={<User />} />
            <Route path="allOrders" element={<Orders />} />
          </Route>

          <Route path="/our-menu/item/:id" element={<OneItemPage />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
