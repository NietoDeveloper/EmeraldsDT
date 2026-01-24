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
                <di" : ""
                  }`}
                >>on
                          : news.description.slice(0, 100)}
                        {news.description.length > 100 && (
                          <span
                            className="text-color-red cursor-pointer"
                            onClick={() => toggleExpandCard(news._id)}
                          >
                            {expandedCardId === news._id
                              ? " Read Less"
                              : " Read More"}
                          </span>
                        )}
                      </p>
                      <h6 className="font-semibold text-color-red mt-5">
                        {news.createdAt.slice(0, 10)}
                      </h6>
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
