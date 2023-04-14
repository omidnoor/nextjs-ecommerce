import Link from "next/link";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";

import { simillar_products } from "@/data/products";

import styles from "./styles.module.scss";
import "swiper/scss";
import "swiper/scss/navigation";
export default function Similar() {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        slidesPerGroup={3}
        navigation={true}
        modules={[Navigation]}
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
    </>
  );
}
