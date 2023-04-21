import styles from "./styles.module.scss";

export default function Summary({
  user,
  cart,
  totalAfterDiscount,
  paymentMethod,
  selected,
}) {
  return <div className={styles.summary}></div>;
}
