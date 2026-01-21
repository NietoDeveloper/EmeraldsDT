import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios f
                        <div className="h-8 w-8 absolute top-[30%] left-3 -translate-x-1/3 flex items-center cursor-pointer justify-center">
                          <FaMinus className="text-[#bebebe] hover:text-red-500" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>

          {/*related product section end */}

          <Footer />
        </div>
      )}
      <AddToCart
        showModal={showModal}
        closeModal={closeModel}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default OneProductPage;
