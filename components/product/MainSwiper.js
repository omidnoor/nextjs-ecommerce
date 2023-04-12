import { useState } from "react";

import styles from "./styles.module.scss";

export default function MainSwiper({ images, activeImg }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <img src={images[active].url} alt="active product image" />
      </div>

      <div className={styles.swiper__list}>
        {images.map((image, index) => (
          <div
            className={`${styles.swiper__list_item} ${
              index === active && styles.active
            }`}
            key={index}
            onMouseOver={() => setActive(index)}
          >
            <img src={image.url} alt={`image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
