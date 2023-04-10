import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { MdFlashOn } from "react-icons/md";

import styles from "./styles.module.scss";
import "swiper/css";
import "swiper/css/pagination";

import FlashCard from "./FlashCard";
import Countdown from "@/components/countdown";
import { flashDealsArray } from "@/data/home";

export default function FlashDeals() {
  return (
    <div className={styles.flash}>
      <div className={styles.flash__header}>
        <div className={styles.flash__header_left}>
          <h1>Flash Sale</h1>
          <MdFlashOn />
        </div>
        <Countdown date={new Date(2023, 5, 1)} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          400: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          1500: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        className="flash__swiper"
      >
        <div className={styles.flash__list}>
          {flashDealsArray.map((item, index) => (
            <SwiperSlide key={index}>
              <FlashCard product={item} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
