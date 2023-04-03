import { useSelector } from "react-redux";
import Link from "next/link";

import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";

import styles from "./styles.module.scss";

export default function Main() {
  const { cart } = useSelector((state) => ({ ...state }));
  console.log(cart.items);

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <img className={styles.logo} src="../../../logo.png" alt="logo" />
        </Link>

        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>

        <Link href="/cart" className={styles.cart}>
          <FaOpencart />
          <span>{cart.items.length}</span>
        </Link>
      </div>
    </div>
  );
}
