
          )}

          {/* News */}
          {subAdmin && subAdmin?.newsPermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isNewsSubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleNewsSubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>News</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isNewsSubchildVisible && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addnews" className="px-4 py-2">
                      Add News
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allnews" className="px-4 py-2">
                      All News
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Ingredient */}
          {subAdmin && subAdmin?.ingrdientPermission === true && (
            <li
              className={`mb-2 transition-all duration-300 h-10 overflow-hidden ${
                isIngrdientSubchildVisible ? "h-32" : ""
              }`}
              onClick={toggleIngrdientSubchildVisibility}
            >
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-amber-300	hover:text-black">
                <MdOutlineNoteAlt className="text-xl mr-2" />
                <span>Ingredient</span>
                <FaChevronDown className="d-block ms-auto" />
              </div>

              {isIngrdientSubchildVisible && (
                <ul className="transition-all duration-300 ">
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/addingredient" className="px-4 py-2">
                      Add Ingredient
                    </Link>
                  </li>
                  <li className="py-2 ps-10 hover:bg-color-red">
                    <Link to="/subAdmin/allingredient" className="px-4 py-2">
                      All Ingredient
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {subAdmin && subAdmin?.userPermission === true && (
            <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
              <Link
                to="/subadmin/allUser"
                className="flex items-center gap-4 px-4 py-2"
              >
                <FaUserFriends className="text-xl mr-2" />
                <span>User</span>
              </Link>
            </li>
          )}

          {subAdmin && subAdmin?.orderPermission === true && (
            <li className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black">
              <Link
                to="/subadmin/allOrders"
                className="flex items-center gap-4 px-4 py-2"
              >
                <TbSitemap className="text-xl mr-2" />
                <span>Orders</span>
              </Link>
            </li>
          )}

          {/* Log out */}
          <li
            className="mb-2 transition-all duration-300 hover:bg-amber-300	hover:text-black"
            onClick={logoutHandler}
          >
            <Link to="/" className="flex items-center gap-4 px-4 py-2">
              <AiOutlineLogout className="text-xl mr-2" />
              <span>Log out</span>
            </Link>
          </li>
        </ul>
      </div>
      <section className="ml-64 transition-all duration-500 ease-in-out">
        <div style={{ padding: "20px" }} className="grid grid-cols-1">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SubAdmin;
