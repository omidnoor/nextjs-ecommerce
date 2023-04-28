import { ErrorMessage, useField } from "formik";
import { MenuItem, TextField } from "@mui/material";

import styles from "./styles.module.scss";

export default function SingularSelect({
  data,
  onChangeHandler,
  placeholder,
  header,
  disabled,
  ...rest
}) {
  const [field, meta] = useField(rest);
  return (
    <div style={{ paddingBottom: "16px" }}>
      {header && (
        <div
          className={`${styles.header} ${
            meta.error ? styles.header__error : ""
          }`}
        >
          <div className={styles.flex}>
            {meta.error && (
              <img src="../../../images/warning.png" alt="warning" />
            )}
            {header}
          </div>
        </div>
      )}
      <TextField
        variant="outlined"
        name={field.name}
        select
        disabled={disabled}
        label={placeholder}
        value={field.value}
        onChange={onChangeHandler}
        className={`${styles.select} ${
          meta.touched && meta.error && styles.error_select
        }`}
      >
        <MenuItem key={""} value={""}>
          No Selected / Or Empty
        </MenuItem>
        {data.map((option, index) => (
          <MenuItem key={index} value={option._id || option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {meta.touched && meta.error ? (
        <p className={styles.error_msg}>{meta.error.option}</p>
      ) : null}
    </div>
  );
}
