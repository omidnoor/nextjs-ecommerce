import styles from "./styles.module.scss";

export default function Checkout({
  subtotal,
  shipping,
  total,
  selected,
  saveCartToDbHandler,
}) {
  return (
    <div className={`${styles.checkout} ${styles.card}`}>
      <h2>Order Summary</h2>
      <div className={styles.checkout_line}>
        <span>Subtotal</span>
        <span>CAD {subtotal}$</span>
      </div>
      <div className={styles.checkout_line}>
        <span>Shipping</span>
        <span>+{Number(shipping)}$</span>
      </div>
      <div className={styles.checkout_total}>
        <span>Total</span>
        <span>CAD {total}$</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={selected.length === 0}
          style={{
            backgroundColor: `${selected.length === 0 ? "#999" : ""}`,
            cursor: `${selected.length === 0 ? "not-allowed" : ""}`,
          }}
          onClick={() => saveCartToDbHandler()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
