import ProductCard from "./ProductCard";

import styles from "./styles.module.scss";

export default function Products({ products }) {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
