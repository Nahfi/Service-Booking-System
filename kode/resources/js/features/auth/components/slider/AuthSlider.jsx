
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Testimonial from '../testimonial/Testimonial';
import "./slider.scss";

const AuthSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <Testimonial />
      </SwiperSlide>
      <SwiperSlide>
        <Testimonial />
      </SwiperSlide>
      <SwiperSlide>
        <Testimonial />
      </SwiperSlide>
    </Swiper>
  );
};

export default AuthSlider;
