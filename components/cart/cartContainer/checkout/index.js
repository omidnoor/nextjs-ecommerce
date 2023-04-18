import styles from "./styles.module.scss";

export default function Checkout({ subtotal, shippingFee, total, selected }) {
  return (
    <div className={styles.checkout}>
      <h2>Order Summary</h2>
      <div className={styles.checkout_line}>
        <span>Subtotal</span>
        <span>CAD{subtotal}$</span>
      </div>
      <div className={styles.checkout_line}>
        <span>Shipping</span>
        <span>+{shippingFee}$</span>
      </div>
      <div className={styles.checkout_total}>
        <span>Total</span>
        <span>CAD{total}$</span>
      </div>
      <div className={styles.submit}>
        <button>Continue</button>
      </div>
    </div>
  );
}
