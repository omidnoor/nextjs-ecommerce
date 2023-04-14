import { IoArrowDown } from "react-icons/io5";
import { useState } from "react";

import styles from "./styles.module.scss";

export default function Select({ props, text, data }) {
  const [visible, setVisible] = useState(true);
  return (
    <div className={styles.select}>
      <div className={styles.select__header}>
        <span className="flex" style={{ padding: "0 5px" }}>
          {props || `Select ${text}`}
          <IoArrowDown />
        </span>

        {visible && (
          <ul className={styles.select__header_menu}>
            {data.map((item, index) => {
              if (text === "Size") {
                return (
                  <li key={index}>
                    <span>{item.size}</span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
