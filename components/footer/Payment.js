import styles from "./styles.module.scss";

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h4>WE ACCEPT</h4>
      <div className={styles.footer__flexwrap}>
        <img src="../../../images/payments/visa.webp" alt="visa" />
        <img src="../../../images/payments/mastercard.webp" alt="mastercard" />
        <img src="../../../images/payments/paypal.webp" alt="paypal" />
      </div>
    </div>
  );
}
