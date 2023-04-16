import CartContainer from "@/components/cart/cartContainer";
import CartHeader from "@/components/cart/header";
import Footer from "@/components/footer";
import Header from "@/components/header";

const cart = [];

export default function Cart() {
  return (
    <>
      <CartHeader />
      <CartContainer cart={cart} />
    </>
  );
}
