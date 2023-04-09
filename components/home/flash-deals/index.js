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
        <div className={styles.flash__header_right}>
          <h1>Flash Sale</h1>
          <MdFlashOn />
        </div>
        <Countdown />
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="flash__swiper"
      >
        .{styles.flash__card}
        {flashDealsArray.map((item, index) => (
          <SwiperSlide key={index}>
            <FlashCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
