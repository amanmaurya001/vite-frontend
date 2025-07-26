import React from 'react'
import "./Block4.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
const Block4 = () => {
  return (
        <section className="block4">
            <Swiper
              className="swiper1"
              modules={[Autoplay]}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              <SwiperSlide>
                <img src="/PHotos/home/corset-shirt.png" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="PHotos/index/block5.2.jpg" alt="" />
              </SwiperSlide>
            </Swiper>
          </section>
  )
}

export default Block4