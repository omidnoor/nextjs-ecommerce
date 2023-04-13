import { useState } from "react";
import { useRouter } from "next/router";
import Rating from "@mui/material/Rating";

import styles from "./styles.module.scss";
import Link from "next/link";

export default function ProductInfo({ product }) {
  const router = useRouter();
  const [size, setSize] = useState(null);
  console.log(product.sizes);
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
        {!size ? <h2>{product.priceRange}</h2> : <h2>{product.price}</h2>}
        {product.discount > 0 ? (
          <h3>
            <span>{product.priceBefore} </span>
            <span>(-{product.discount}%)</span>
          </h3>
        ) : (
          ""
        )}
      </div>

      <div className={styles.info__shipping}>
        {product.shipping
          ? `+${product.shipping}$ shipping fee`
          : `Free shipping`}
      </div>

      <div className={styles.info__qty}>
        {!size
          ? `${product.quantity} pieces available`
          : `${product.sizes.reduce(
              (start, next) => start + next.qty,
              0,
            )} pieces available`}
      </div>

      <div className={styles.info__sizes}>
        <p className={styles.p}>Select a size : </p>
        <div className={styles.info__sizes_wrap}>
          {product.sizes.map((productSize, index) => (
            <Link
              key={index}
              href={`/product/${product.slug}?style=${router.query.style}&size=${index}`}
              onClick={() => setSize(productSize.size)}
            >
              <div
                className={`${styles.info__sizes_size} ${
                  index.toString() === router.query.size
                    ? styles.info__sizes_active
                    : ""
                }`}
              >
                {productSize.size}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
