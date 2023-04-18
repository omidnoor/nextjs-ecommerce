import { useState } from "react";
import Checkout from "./checkout";
import CartEmpty from "./cartEmpty";
import CartHeaderContainer from "./cartHeader";
import CartItem from "./cartItem";

import styles from "./styles.module.scss";

export default function CartContainer({ cart }) {
  const [selected, setSelected] = useState([]);

  return (
    <div className={styles.cart}>
      {cart.items.length > 0 ? (
        <div className={styles.cart__container}>
          {/* <div className={styles.cart_container_inner}> */}
          <CartHeaderContainer
            items={cart.items}
            selected={selected}
            setSelected={setSelected}
          />
          <div className={styles.cart__products}>
            {cart.items.map((item, index) => (
              <CartItem
                key={item._uid}
                item={item}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          {/* </div> */}
          <div className={styles.cart__checkout}>
            <Checkout
              subtotal="5454"
              shippingFee={0}
              total="4554"
              selected={[]}
            />
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}
