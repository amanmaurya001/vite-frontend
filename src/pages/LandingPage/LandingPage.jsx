import axios from "axios";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import Block1 from "../../component/landingPageElements/Block1/Block1";
import Block2 from "../../component/landingPageElements/Block2/Block2";
import Block3 from "../../component/landingPageElements/Block3/Block3";
import Block4 from "../../component/landingPageElements/Block4/Block4";
import Block5 from "../../component/landingPageElements/Block5/Block5";
import Block6 from "../../component/landingPageElements/Block6/Block6";
import Block7 from "../../component/landingPageElements/Block7/Block7";
import Block8 from "../../component/landingPageElements/Block8/Block8";
import NewsLetter from "../../component/landingPageElements/NewsLetter/NewsLetter";

const LandingPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
 <>
      <Block1 />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block5 />
      <section className="block5" style={{ marginTop: "4vh" }}>
        <Swiper
          className="swiper1"
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          <SwiperSlide>
            <img src="PHotos/index/block5.1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="PHotos/index/block5.2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="PHotos/LS_M4.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="PHotos/LS_M6.png" alt="" />
          </SwiperSlide>
        </Swiper>
      </section>
      <Block6 />
      <Block7 />
      <Block8 />
      <NewsLetter/>
</>

  );
};

export default LandingPage;
