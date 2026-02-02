import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const NewNews = () => {
  const [data, setData] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);


  const toggleExpandCard = (id) => {
    setExpandedCardId(id === expandedCardId ? null : id);
  };

  return (



    
                    </h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewNews;
