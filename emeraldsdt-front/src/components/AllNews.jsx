import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "../utils/axios";

const AllNews = () => {
  const [data, setData] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/news/readNews");
        setData(data.news);
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
    <div style={{ maxWidth: "1600px" }} className="mx-auto">
      <Navbar />

      <div className="lg:px-40 lg:mt-44">
        <div className="h-[auto] w-full flex flex-col items-end relative lg:mt-12 mt-20">
          <div className=" w-full px-10 pr-5 relative">
            <h1 className="text-3xl font-hobo text-color-red text-center lg:mb-12 ">
              News and Events
            </h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
              {data.map((news) => (
                <div
                  key={news._id}
                  className={`h-full relative overflow-hidden py-5 border-2 mt-5 rounded-xl ${
                    expandedCardId === news._id ? "border-red-600" : ""
                  }`}
                >
                  <div className="w-full relative">
                    <div className="px-5 h-full">
                      <img
                        src={news?.image?.url}
                        alt=""
                        className="w-1/2 block mx-auto mb-5"
                      />
                      <h1
                        className="text-xl font-semibold text-color-red mb-5 cursor-pointer"
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
