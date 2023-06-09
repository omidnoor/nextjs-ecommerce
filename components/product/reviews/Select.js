import { IoArrowDown } from "react-icons/io5";
import { useState } from "react";

import styles from "./styles.module.scss";

export default function Select({
  props,
  text,
  data,
  onSizeChange,
  onStyleChange,
  onFitChange,
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.select}>
      {text}:
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          padding: "0 5px",
          backgroundColor: `${
            text === "Style" && props.color ? `${props.color}` : ""
          }`,
        }}
      >
        <span className={`${styles.flex} ${styles.select__header_wrap}`}>
          {text === "Size" ? props || `Select ${text}` : ""}
          {text === "Style" && props.image ? (
            <img src={props.image} alt="styles" />
          ) : (
            ""
          )}
          {text === "Style" && !props.image ? `Select ${text}` : ""}
          {text === "Fit" ? props || text : ""}
          <IoArrowDown />
        </span>

        {visible && (
          <>
            <ul className={styles.select__header_menu}>
              {data?.map((item, index) => {
                if (text === "Size") {
                  return (
                    <li key={index} onClick={() => onSizeChange(item.size)}>
                      <span>{item.size}</span>
                    </li>
                  );
                }
              })}
            </ul>

            <ul className={styles.select__header_menu}>
              {data?.map((item, index) => {
                if (text === "Style") {
                  return (
                    <li
                      key={index}
                      onClick={() => onStyleChange(item)}
                      style={{ background: `${item.color}` }}
                    >
                      <span>
                        <img src={item.image} alt="styles" />
                      </span>
                    </li>
                  );
                }
              })}
            </ul>

            <ul className={styles.select__header_menu}>
              {data?.map((item, index) => {
                if (text === "Fit") {
                  return (
                    <li
                      key={index}
                      onClick={() => onFitChange(item)}
                      style={{ background: `${item.fit}` }}
                    >
                      <span>{item}</span>
                    </li>
                  );
                }
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
