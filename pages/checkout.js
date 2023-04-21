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
import Summary from "@/components/checkout/summary";

import styles from "../styles/checkout.module.scss";

export default function checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    let selectedAddress = addresses.find((address) => address.active === true);
    selectedAddress
      ? setSelectedAddress(selectedAddress)
      : setSelectedAddress("");
  }, [addresses]);
  return (
    <>
      <Header />
      <div className={`${styles.checkout} ${styles.container}`}>
        <div className={styles.checkout__side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Products cart={cart} />
        </div>
        <div className="">
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
          />
        </div>
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
