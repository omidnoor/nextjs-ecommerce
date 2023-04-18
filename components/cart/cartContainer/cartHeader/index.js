import { useEffect, useState } from "react";

import compareAray from "@/utils/compareAray";

import styles from "./styles.module.scss";

export default function CartHeaderContainer({ items, selected, setSelected }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check = compareAray(items, selected);
    setActive(check);
  }, [selected]);

  const onSelectHandler = () => {
    if (selected.length === items.length) {
      setSelected([]);
      setActive(false);
    } else {
      setSelected(items);
      setActive(true);
    }
  };

  return (
    <div className={`${styles.cart} ${styles.card}`}>
      <h1>Item Summary({items.length})</h1>
      <div className={styles.flex}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => onSelectHandler()}
        ></div>
        <span>Select all items</span>
      </div>
    </div>
  );
}
