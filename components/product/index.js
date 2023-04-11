import Head from "next/head";

import styles from "./styles.module.scss";
import Header from "../header";
import Footer from "../footer";

export default function ProductSingle({ product, country }) {
  console.log(product);
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.container}>
          <div className={styles.path}>
            Home / {product.category.name}{" "}
            {product.subCategories.map((sub, index) => (
              <span> / {sub.name}</span>
            ))}
          </div>
        </div>
      </div>

      <Footer country={country} />
    </>
  );
}
