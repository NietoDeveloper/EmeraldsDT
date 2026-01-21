
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
