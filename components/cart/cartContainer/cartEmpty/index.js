import { useSession, signIn } from "next-auth/react";

import styles from "./styles.module.scss";
import Link from "next/link";

export default function CartEmpty() {
  const { data: session } = useSession();

  return (
    <div className={styles.empty}>
      <img src="../../../../images/empty.png" alt="empty container" />
      <h1>Cart is empty</h1>

      {!session && (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          Sign In / Register
        </button>
      )}

      <Link href="/browse">
        <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
          Shop Now
        </button>
      </Link>
    </div>
  );
}
