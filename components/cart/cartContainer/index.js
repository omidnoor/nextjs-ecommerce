import CartEmpty from "./cartEmpty";

import styles from "./styles.module.scss";

export default function CartContainer({ cart }) {
  return (
    <div className={styles.cart}>
      {cart.length > 1 ? (
        <div className={styles.cart__container}></div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}
