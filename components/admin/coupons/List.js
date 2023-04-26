import { useEffect } from "react";
import ListItem from "./ListItem";

import styles from "./styles.module.scss";

export default function List({ coupons, setCoupons }) {
  return (
    <ul className={styles.list}>
      {coupons?.map((coupon, index) => (
        <ListItem coupon={coupon} setCoupons={setCoupons} key={index} />
      ))}
    </ul>
  );
}
