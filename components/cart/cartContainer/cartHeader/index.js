import styles from "./styles.module.scss";

export default function CartHeaderContainer({ items }) {
  return (
    <div className={`${styles.cart} ${styles.card}`}>
      <h1>Item Summary({items.length})</h1>
      <div className={styles.flex}>
        <div className={styles.checkbox}></div>
        <span>Select all items</span>
      </div>
    </div>
  );
}
