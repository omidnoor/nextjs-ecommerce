import styles from "./styles.module.scss";

export default function ProductInfo({ product }) {
  return (
    <div className={styles.info}>
      <div className={styles.info__container}>
        <h1 className={styles.info__name}>{product.name}</h1>
        <h2 className={styles.info__sku}>{product.sku}</h2>
        <div className={styles.info__rating}></div>
      </div>
    </div>
  );
}
