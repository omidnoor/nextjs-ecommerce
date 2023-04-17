import CartEmpty from "./cartEmpty";
import CartHeaderContainer from "./cartHeader";
import CartItem from "./cartItem";

import styles from "./styles.module.scss";

export default function CartContainer({ cart }) {
  return (
    <div className={styles.cart}>
      {cart.items.length > 0 ? (
        <div className={styles.cart__container}>
          <CartHeaderContainer items={cart.items} />
          <div className={styles.cart__products}>
            {cart.items.map((item, index) => (
              <CartItem key={item._uid} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}
