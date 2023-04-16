import Link from "next/link";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";

import { simillar_products } from "@/data/products";

import styles from "./styles.module.scss";
import "swiper/scss";
import "swiper/scss/navigation";
export default function Similar() {
  return (
    <div className={styles.similar}>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        // slidesPerGroup={3}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          400: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        }}
        className={styles.similar_swiper}
      >
        {simillar_products.map((product, index) => (
          <SwiperSlide key={index}>
            <Link href="/">
              <img src={product} alt="similar product" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
