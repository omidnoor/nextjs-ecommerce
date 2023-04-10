import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";

export default function CategoryCard({ header, products, background }) {
  return (
    <div
      className={styles.categoryCard}
      style={{ backgroundColor: `${background}` }}
    >
      <div className={styles.categoryCard__header}>
        <h3>{header}</h3>
        <BsArrowRightCircle />
      </div>
      <div className={styles.categoryCard__products}>
        {products.map((product, index) => (
          <div key={index} className={styles.product}>
            <img src={product.image} alt={`product ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
