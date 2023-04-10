import Link from "next/link";
import { useEffect, useState } from "react";
import Product from "@/models/product";

import styles from "./styles.module.scss";
import ProductSwiper from "./ProductSwiper";

export default function ProductCard({ product }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((s) => s.price)
      .sort((a, b) => a - b),
  );
  const [productStyles, setProductStyles] = useState(
    product.subProducts?.map((p) => p.color),
  );
  useEffect(() => {
    setImages(product.subProducts[active]?.images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => s.price)
        .sort((a, b) => a - b),
    );
  }, [active]);

  //   console.log(images, prices, productStyles);
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?styles=${active}`}>
          <div>
            <ProductSwiper images={images} />
          </div>
        </Link>
      </div>
    </div>
  );
}
