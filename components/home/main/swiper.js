import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import styles from "./styles.module.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={`${styles.mainSwiper} ${styles.swiper}`}
      >
        {[...Array(10).keys()].map((index) => (
          <SwiperSlide className={styles["swiper-slide"]}>
            <img
              src={`/images/swiper/${index + 1}.jpg`}
              alt={`swiper image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
