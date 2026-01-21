
                          </div>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-2/12">
                          <p className="text-lg font-bold text-red-500">
                            €{item.price}
                          </p>
                          <span className="text-xs text-gray-500 line-through">
                            €1500
                          </span>
                        </div>
                        <div className="w-1/2 px-4 md:w-1/6 lg:w-2/12 ">
                          <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md">
                            <button
                              className="py-2 hover:text-gray-700"
                              onClick={() => decreaseCartQuantity(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-dash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                              </svg>
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              className="w-12 px-2 py-4 text-center border-0 rounded-md bg-gray-50 md:text-right"
                              readOnly
                            />
                            <button
                              className="py-2 hover:text-gray-700"
                              onClick={() => increaseCartQuantity(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-plus"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="w-1/2 px-4 text-right md:w-1/6 lg:w-2/12 ">
                          <p className="text-lg font-bold text-red-500">
                            €{item.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
        <section className=" bg-gray-100">
          <div className=" py-6 mx-auto w-full lg:py-4 md:px-6">
            <div className="w-full px-4 mb-4">
              <div className="p-6 border border-red-100 bg-gray-50 w-full md:p-8">
                <h2 className="mb-8 text-3xl font-bold text-gray-700">
                  Order Summary
                </h2>
                {/* Order summary details */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-xl font-bold text-gray-700">
                    € {total}.00
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 mb-4">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-xl font-bold text-gray-700">Free</span>
                </div>
                <div className="flex items-center justify-between pb-4 mb-4">
                  <span className="text-gray-700">Order Total</span>
                  <span className="text-xl font-bold text-gray-700">
                    € {total}.00
                  </span>
                </div>
                <h2 className="text-lg text-gray-500">We offer:</h2>
                <div className="flex items-center gap-2 mb-4">
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                </div>
                {/* Checkout button */}
                <div className="flex items-center justify-between">
                  {isUserAuthenticated ? (
                    <button
                      className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-red-500 rounded-md hover:bg-red-600"
                      onClick={CheckOutHandler}
                    >
                      Checkout
                    </button>
                  ) : (
                    <button
                      className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-red-500 rounded-md hover:bg-red-600"
                      onClick={() => setShowModal(true)}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {acceptOrder ? (
          isUserAuthenticated ? (
            ""
          ) : (
            <RegisterModal
              showModal={showModal}
              setShowModal={setShowModal}
              setIsUserAuthenticated={setIsUserAuthenticated}
            />
          )
        ) : (
          <DisableOrderModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}

        <Footer />
      </div>
    </>
  );
};

export default Cart;
