import styles from "./styles.module.scss";

export default function PaymentMethods({ cart }) {
  return (
    <div className={`${styles.method} ${styles.card}`}>
      <h2 className={styles.header}>Payment Methods</h2>
      <div className={styles.images}>
        <img src="/images/payments/visa.webp" alt="visa" />
        <img src="/images/payments/mastercard.webp" alt="mastercard" />
        <img src="/images/payments/paypal.webp" alt="paypal" />
      </div>
      <h3>Buyer Protection</h3>
      <div className={styles.protection}>
        <img src="/images/protection.png" alt="protection" />
        <p>Get full refund based on our policy</p>
      </div>
    </div>
  );
}
