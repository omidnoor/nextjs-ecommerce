import Link from "next/link";
import { useEffect, useState } from "react";
import ProductSwiper from "./ProductSwiper";

import styles from "./styles.module.scss";

export default function ProductCard({ product }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product?.subProducts[active]?.sizes
      .map((s) => s?.price)
      .sort((a, b) => a - b),
  );
  const [productStyles, setProductStyles] = useState(
    product?.subProducts?.map((p) => p.color),
  );
  useEffect(() => {
    setImages(product?.subProducts[active]?.images);
    setPrices(
      product?.subProducts[active]?.sizes
        .map((s) => s?.price)
        .sort((a, b) => a - b),
    );
  }, [active]);

  console.log(productStyles);
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product?.slug}?styles=${active}`}>
          <ProductSwiper images={images} />
        </Link>
        {product?.subProducts[active]?.discount ? (
          <div className={styles.product__discount}>
            -${product?.subProducts[active]?.discount}%
          </div>
        ) : null}
        <div className={styles.product__infos}>
          <h3>
            {product?.name?.length > 45
              ? `${product?.name?.substring(0, 45)}...`
              : product?.name}
          </h3>
          <span>
            {prices && prices?.length === 1 && `CAD${prices[0]}$`}
            {prices &&
              prices?.length !== 1 &&
              `CAD${prices[0]}-${prices[prices?.length - 1]}$`}
          </span>
          <div className={styles.product__colors}>
            {productStyles &&
              productStyles.map((productStyle, index) =>
                productStyle?.image ? (
                  <img
                    src={productStyle.image}
                    className={index === active ? styles.active : ""}
                    onMouseEnter={() => {
                      setImages(product.subProducts[index]?.images);
                      setActive(index);
                    }}
                    alt={`image ${index}`}
                  />
                ) : (
                  <span
                    style={{ backgroundColor: `${productStyle.color}` }}
                    onMouseEnter={() => {
                      setImages(product.subProducts[index]?.images);
                      setActive(index);
                    }}
                  ></span>
                ),
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
