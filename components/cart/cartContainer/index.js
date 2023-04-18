import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";

import Checkout from "./checkout";
import CartEmpty from "./cartEmpty";
import CartHeaderContainer from "./cartHeader";
import CartItem from "./cartItem";
import PaymentMethods from "./paymentMenthods";
import { saveCart } from "@/requests/user";

import styles from "./styles.module.scss";

export default function CartContainer({ cart }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const saveCartToDbHandler = async () => {
    try {
      if (session) {
        const res = await saveCart(selected, session.user.id);
      } else {
        signIn();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const shippingValue = selected
      ?.reduce((acc, item) => acc + Number(item.shipping), 0)
      .toFixed(2);

    const subtotalValue = selected
      ?.reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);

    setShipping(shippingValue);
    setSubtotal(subtotalValue);

    const totalValue = (
      parseFloat(subtotalValue) + parseFloat(shippingValue)
    ).toFixed(2);

    setTotal(totalValue);
  }, [selected]);

  return (
    <div className={styles.cart}>
      {cart.items.length > 0 ? (
        <div className={styles.cart__container}>
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

          <div className={styles.cart__checkout}>
            <Checkout
              subtotal={subtotal}
              shippingFee={shipping}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
          </div>
          <div className={styles.cart__method}>
            <PaymentMethods />
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}
