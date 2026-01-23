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



                </div>
        
                      type="checkbox"
               

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