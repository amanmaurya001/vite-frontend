import React from 'react'
import "./Block3.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
const Block3 = () => {
  return (
    <section className="block3">
        <h1 className="block3-text-1">Step into</h1>
        <h2 className="block3-text-2">Rare</h2>
        <h3 className="block3-text-3">Comfort</h3>
        <div id="box2">
          <Swiper
            id="xxxx"
            className="mySwiper2"
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              451: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            {[
              {
                label: "T-Shirt",
                link: "t-shirts-women",
                img: "PHotos/home/block3-top.jpg",
              },

              {
                label: "Corset",
                link: "/productlisting/women/corset",
                img: "/PHotos/women/women-corset/corset0001/1.jpg",
              },
              {
                label: "MIDI",
                link: "midi-dress",
                img: "/PHotos/home/block3-midi.jpg",
              },
              {
                label: "MAXI",
                link: "maxidress",
                img: "/PHotos/home/block3-maxi.jpg",
              },
              {
                label: "Trousers",
                link: "denim-jeans-women",
                img: "PHotos/home/block3-jeans.jpg",
              },
            ].map((item, index) => (
              <SwiperSlide key={index}>
                <div className="block3-product">
                  <h1>{item.label}</h1>
                  <button id="button1">shop now</button>
                  <Link to={item.link}>
                    <img src={`${item.img}`} alt="" />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
  )
}

export default Block3;