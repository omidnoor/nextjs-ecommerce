import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import { useRef } from "react";

import styles from "./styles.module.scss";
import { useEffect } from "react";

export default function ShippingInput({ placeholder, ...props }) {
  const inputRef = useRef(null);
  const [field, meta] = useField(props);
  const [move, setMove] = useState(false);

  useEffect(() => {
    if (field?.value?.length > 0) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [field.value]);

  return (
    <div
      className={`${styles.input} ${
        meta.error && meta.touched && styles.input__error
      }`}
    >
      <div
        className={styles.input__wrapper}
        onFocus={() => setMove(true)}
        onBlur={() => setMove(field?.value?.length > 0 ? true : false)}
      >
        <input
          ref={inputRef}
          {...field}
          type={field.type}
          name={field.name}
          {...props}
        />
        <span
          onClick={() => {
            inputRef.current.focus();
            setMove(true);
          }}
          className={move ? styles.move : ""}
        >
          {placeholder}
        </span>
      </div>
      <p>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
    </div>
  );
}
