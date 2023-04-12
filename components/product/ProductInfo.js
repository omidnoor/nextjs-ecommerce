import { Rating } from "@mui/material";

import styles from "./styles.module.scss";

export default function ProductInfo({ product }) {
  return (
    <div className={styles.info__container}>
      <h1 className={styles.info__name}>{product.name}</h1>
      <h2 className={styles.info__sku}>{product.sku}</h2>
      <div className={styles.info__rating}>
        <Rating
          name="half-rating"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
          style={{ color: "#facf19" }}
        />
        {product.numReviews}
        {product.numReviews === 1 ? "review" : "reviews"}
      </div>
      <div className={styles.info__price}>
        <div>
          {product.priceRange ? (
            <h2>{product.priceRange}</h2>
          ) : (
            <h2>{product.price}</h2>
          )}
          {product.discount > 0 ? (
            <h3>
              <span>{product.priceBefore} </span>
              <span>(-{product.discount}%)</span>
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
