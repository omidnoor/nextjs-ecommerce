import { useSelector } from "react-redux";

import CartContainer from "@/components/cart/cartContainer";
import CartHeader from "@/components/cart/header";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Cart() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <CartHeader />
      <CartContainer cart={cart} />
    </>
  );
}
