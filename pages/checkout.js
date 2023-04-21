import { useEffect } from "react";
import { useState } from "react";
import { getSession } from "next-auth/react";

import User from "@/models/User";
import Cart from "@/models/cart";
import db from "@/utils/db";
import Header from "@/components/cart/header";
import Shipping from "@/components/checkout/shipping";
import Products from "@/components/checkout/products";
import Payment from "@/components/checkout/payment";

import styles from "../styles/checkout.module.scss";

export default function checkout({ cart, user }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  return (
    <>
      <Header />
      <div className={`${styles.checkout} ${styles.container}`}>
        <div className={styles.checkout__side}>
          <Shipping user={user} />
          <Products cart={cart} />
        </div>
        <Payment
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const session = await getSession(context);
  const user = await User.findById(session?.user.id);
  const cart = await Cart.findOne({ user: user?._id });
  await db.disconnectDb();
  // console.log(cart);
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
