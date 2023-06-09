import { IoArrowDown } from "react-icons/io5";
import { useState } from "react";

import styles from "./styles.module.scss";

export default function TableSelect({
  props,
  text,
  data,
  onRatingChange,
  onSizeChange,
  onStyleChange,
  onOrderChange,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.select}>
      <div className={styles.select__title}>{text}:</div>

      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          padding: "0 5px",
          backgroundColor: `${
            text === "Style" && props?.color ? `${props.color}` : ""
          }`,
        }}
      >
        <span className={`${styles.flex} ${styles.select__header_wrap}`}>
          {text === "Rating" || text === "Size" || text === "Order"
            ? props || `Select ${text}`
            : ""}
          {text === "Style" && props.image ? (
            <img src={props.image} alt="styles" />
          ) : (
            ""
          )}
          {text === "Style" && !props?.image ? `Select ${text}` : ""}

          <IoArrowDown />
        </span>

        {visible && (
          <>
            <ul className={styles.select__header_menu}>
              {data?.map((item, index) => {
                if (text === "Rating") {
                  return (
                    <li key={index} onClick={() => onRatingChange(item.text)}>
                      <span>{item.text}</span>
                    </li>
                  );
                }
              })}
            </ul>

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
                      <span
                        style={{ background: `${!item.image ? "#FFF" : ""}` }}
                      >
                        {item.image ? (
                          <img src={item.image} alt="styles" />
                        ) : (
                          "All Styles"
                        )}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>

            <ul className={styles.select__header_menu}>
              {data?.map((item, index) => {
                if (text === "Order") {
                  return (
                    <li key={index} onClick={() => onOrderChange(item.text)}>
                      <span>{item.value}</span>
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
