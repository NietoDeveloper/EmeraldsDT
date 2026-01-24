import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "../utils/axios";
seState([]);andedCardId] = useState(null);

  useEffect(() => {


  const toggleExpandCard = (id) => {

  return (
 />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AllNews;
