import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import styles from "./styles.module.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export default function ProductSwiper({ images }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, [swiperRef]);

  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => swiperRef.current.swiper.autoplay.start()}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper
        ref={swiperRef}
        centerdSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={1500}
        modules={[Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide>
            <img src={image?.url} alt={`${image} ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
