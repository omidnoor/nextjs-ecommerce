import { paymentMethods } from "@/data/paymentMethods";

import styles from "./styles.module.scss";

export default function Payment({ paymentMethod, setPaymentMethod }) {
  return (
    <div className={styles.payment}>
      <div className={styles.header}>
        <h2>Payment Method</h2>
      </div>
      {paymentMethods.map((pm, index) => (
        <label
          key={index}
          htmlFor={pm.id}
          className={styles.payment__item}
          style={{
            backgroundColor: paymentMethod === pm.id ? "#F5F5F5" : "",
          }}
          onClick={() => setPaymentMethod(pm.id)}
        >
          <input
            type="radio"
            name="payment"
            id={pm.id}
            checked={paymentMethod === pm.id}
          />
          <img src={`/images/checkout/${pm.id}.webp`} alt={pm.name} />
          <div className={styles.payment__item__col}>
            <p>Pay with {pm.name}</p>
            <div className={styles.payment__item__col__img}>
              {pm.images.length > 0 ? (
                pm.images.map((image, index) => (
                  <img
                    key={index}
                    src={`/images/payments/${image}.webp`}
                    alt={image}
                  />
                ))
              ) : (
                <p>{pm.description}</p>
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}
