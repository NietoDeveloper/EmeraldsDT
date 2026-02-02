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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/news/readNews");
        setData(data.news);
        const featured = data.news.filter((news) => news.featured === true);
        setFeaturedNews(featured);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const toggleExpandCard = (id) => {
    setExpandedCardId(id === expandedCardId ? null : id);
  };

  return (
    <div className="h-[auto] w-full flex flex-col items-end relative mt-16">
      <div className=" w-full lg:px-10 px-5 lg:pr-5 relative">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-3xl text-2xl font-hobo text-color-red">
            News and Events
          </h1>
          <Link to="/allnews">
            <button className="bg-color-red text-white max-sm:text-sm px-3 py-2 rounded-md font-hobo">
              View All News
            </button>
          </Link>
        </div>

        <Swiper
          slidesPerView={window.innerWidth > 768 ? 3 : 1}
          spaceBetween={30}
          pagination={false}
          className="mySwiper w-full pb-10 lg:px-2 mt-7"
          modules={[Pagination, Navigation, Autoplay]}
          navigation={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

    
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
