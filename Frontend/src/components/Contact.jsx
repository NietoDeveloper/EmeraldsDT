import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ maxWidth: "1600px" }} className="mx-auto">
      <Navbar />
      <div className="lg:px-80 lg:mt-44 mt-20">
        <div className=" h-full  w-full  mt-10  grid-cols-1 lg:px-7 px-2">
          <div className="h-full w-full p-4">
            <div className=" py-5 h-full px-3">
              <h1 className="font-hobo mb-8 text-5xl text-center">
                Contact Us
              </h1>
              <p>
                Whether you’re looking for more information, or you’d just like
                to share your thoughts, you’ll find easy ways to contact us
                right here.
              </p>
              <form className="w-full mx-auto mt-10">
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="first_name"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    * First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder=" "
                    required
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="last_name"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    * Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder=" "
                    required
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    * Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder=" "
                    required
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="country_code"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Country Code
                  </label>
                  <input
                    type="text"
                    name="country_code"
                    id="country_code"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder="e.g. 9XX"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="mobile_number"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile_number"
                    id="mobile_number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder="e.g. 111111111"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="topic"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    * Select a topic
                  </label>
                  <select
                    name="topic"
                    id="topic"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    required
                  >
                    <option value="">-- Please select --</option>
                    <option value="special_offers">Special Offers</option>
                    <option value="vouchers">Vouchers</option>
                    <option value="news">News</option>
                    <option value="promotions">Promotions & Activities</option>
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="terms_conditions"
                    className="block text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="terms_conditions"
                      id="terms_conditions"
                      className="mr-2 leading-tight"
                      required
                    />
                    Yes, I have read and agree to the Let's Falafel{" "}
                    <a
                      href="#"
                      className="text-red-600 hover:underline focus:outline-none"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-red-600 hover:underline focus:outline-none"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="special_offers"
                    className="block text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="special_offers"
                      id="special_offers"
                      className="mr-2 leading-tight"
                    />
                    Please send me special offers, vouchers, news and/or
                    information on Let's Falafel promotions & activities.
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-40">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
