import { useState } from "react";

import styles from "./styles.module.scss";

export default function MainSwiper({ images, activeImg }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.swiper_img}>
      <div className={styles.swiper_img__active}>
        <img src={images[active].url} alt="active product image" />
      </div>

      <div className={styles.swiper_img__list}>
        {images.map((image, index) => (
          <div
            className={`${index === active && styles.active}`}
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
