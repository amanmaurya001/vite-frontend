import React from "react";
import "./RandomSwiper.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "swiper/css";
const RandomSwiper = ({ Gender }) => {
     const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [randomProducts, setRandomProducts] = useState([]);


  useEffect(() => {
    fetch(`${backendUrl}/randomSwiper/${Gender}/products`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRandomProducts(data);
     
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Gender]);
  return (
    <section className="RandomSwiper">
      <Swiper
        className="random-swiper"
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          451: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
       {randomProducts.map((item) => (
          <SwiperSlide key={item._id} className="Random-swiperslide">
            <Link to={`/products/${item.id}`}>
            <img src={item.images[0]} alt={item.name} loading="lazy" />
            <p>{item.name}</p>
             <p>Rs {item.price?.original}.00</p>
             </Link>
          </SwiperSlide>
        ))}
     
      </Swiper>
    </section>
  );
};

export default RandomSwiper;
