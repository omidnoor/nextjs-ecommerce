import { useState } from "react";
import Head from "next/head";
import ProductInfo from "./ProductInfo";

import Header from "../header";
import Footer from "../footer";
import MainSwiper from "./MainSwiper";

import styles from "./styles.module.scss";

export default function ProductSingle({ product, country }) {
  const [activeImg, setActiveImg] = useState("");

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <Header country={country} />

      <div className={styles.product}>
        <div className={styles.container}>
          <div className={styles.product__path}>
            Home / {product.category.name}{" "}
            {product.subCategories.map((sub, index) => (
              <span> / {sub.name}</span>
            ))}
          </div>
          <div className={styles.container__inner}>
            <div className={styles.product__main}>
              <MainSwiper images={product.images} activeImg={activeImg} />
            </div>

            <div className={styles.info}>
              <ProductInfo product={product} setActiveImg={setActiveImg} />
            </div>
          </div>
        </div>
      </div>

      <Footer country={country} />
    </>
  );
}
