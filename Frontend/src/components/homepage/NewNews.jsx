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
        // console.log(data, "data");
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
        >
          {featuredNews.map((news) => (
            <SwiperSlide key={news._id}>
              <div className="h-full relative overflow-hidden py-5 border-2 mt-5 rounded-xl">
                <div className="w-full relative">
                  <div
                    className={`px-5 h-[400px] ${
                      expandedCardId === news._id ? "h-auto" : ""
                    }`}
                  >
                    <img
                      src={news?.image?.url}
                      alt=""
                      className="w-1/2 block mx-auto mb-5"
                    />
                    <h1
                      className="text-xl font-semibold text-color-red mb-5"
                      onClick={() => toggleExpandCard(news._id)}
                    >
                      {news.title}
                    </h1>
                    <p className="mt-2">
                      {expandedCardId === news._id
                        ? news.description
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewNews;
