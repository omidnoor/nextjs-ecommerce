import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import CategoryCard from "./CategoryCard";
import { women_accessories, women_dresses, women_shoes } from "@/data/home";

import styles from "./styles.module.scss";

export default function Category() {
  const isSmallLarge = useMediaQuery({ query: "(min-width: 1200px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 768px)" });

  const productsArray = [
    {
      header: "DRESSES",
      products: women_dresses,
      background: "#5a31f4",
    },
    {
      header: "SHOES / HIGH HEELS",
      products: women_shoes,
      background: "#3c811f",
    },
    {
      header: "ACCESSORIES",
      products: women_accessories,
      background: "#1c0025",
    },
  ];

  return (
    <div className={styles.category}>
      {isSmallLarge ? (
        <>
          {productsArray.map(({ header, products, background }) => (
            <CategoryCard
              header={header}
              products={{ products }}
              background={background}
            />
          ))}
        </>
      ) : (
        <>
          <Swiper
            slidesPerView={isSmall ? 1 : 2}
            spaceBetween={16}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={`${styles.categorySwiper}`}
          >
            {productsArray.map(({ header, products, background }) => (
              <SwiperSlide>
                <CategoryCard
                  header={header}
                  products={{ products }}
                  background={background}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
