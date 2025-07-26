import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import "./Block1.css";

const Block1 = () => {
  return (
    <section id="block1">
        
            <Swiper
              className="swiper2"
              modules={[Autoplay]}
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              <SwiperSlide className="SwiperSlide">
                <img src="PHotos/index/block1.1.jpg" alt="" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="PHotos/index/block1.3.jpg" alt="" />
              </SwiperSlide>
            </Swiper>
        
      </section>
  )
}

export default Block1