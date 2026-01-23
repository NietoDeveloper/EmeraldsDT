import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [copied, setCopied] = useState(false);
se), 2000);
                   
                </div>
              </div>
            </div>


                <div className="relative z-0 w-full mb-5 group">
>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="terms_conditions"
                    className="block text-sm text-gray-700"
                  >

                    Yes, I have read and agree to the Emeralds DT{" "}

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
                    information on Emeralds DT promotions & activities.
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

            {/* Sección de Mapa */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Our Location</h2>
              <p className="text-gray-700 text-center mb-4">Santa Marta, Colombia</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.0000000000005!2d-74.20000000000000!3d11.240000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42f0000000000%3A0x0000000000000000!2sSanta%20Marta%2C%20Magdalena%2C%20Colombia!5e0!3m2!1sen!2sus!4v1630000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;