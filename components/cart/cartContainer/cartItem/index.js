import { AiOutlineDelete } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import styles from "./styles.module.scss";

export default function CartItem({ item }) {
  return (
    <div className={`${styles.card} ${styles.product}`}>
      {item.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="/images/store.webp" alt="store" />
      </div>

      <div className={styles.product__image}>
        <div className={styles.checkbox}></div>
        <img src={item.images[0].url} alt="product image" />
        <div className={styles.grid}>
          <h2>
            {item.name.length > 30
              ? `${item.name.substring(0, 30)}...`
              : item.name}
          </h2>
          <div style={{ zIndex: "2" }}>
            <BsHeart />
          </div>
          <div style={{ zIndex: "2" }}>
            <AiOutlineDelete />
          </div>
        </div>
        <div className={styles.product__style}>
          <img src={item.color.image} alt="product style" />
          {item.size && <span>{item.size.size}</span>}
          {item.size && <span>{item.size.price}$</span>}
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
}
