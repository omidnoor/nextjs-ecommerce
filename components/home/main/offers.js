import Link from "next/link";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./styles.module.scss";
import "swiper/css";
import "swiper/scss/navigation";
import "swiper/css/pagination";

import { offersArray } from "@/data/home";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersArray.map((offer, index) => (
          <SwiperSlide key={index}>
            <Link href="/">
              <img src={offer.image} alt={offer.price} />
            </Link>
            <span>{offer.price}</span>

            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
