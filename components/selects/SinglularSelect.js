import { ErrorMessage, useField } from "formik";
import { MenuItem, TextField } from "@mui/material";

import styles from "./styles.module.scss";

export default function SinglularSelect({
  data,
  onChangeHandler,
  placeholder,
  ...rest
}) {
  const [field, meta] = useField(rest);

  return (
    <div style={{ paddingBottom: "16px" }}>
      <TextField
        variant="outlined"
        name={field.name}
        select
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
        {data.map((country, index) => (
          <MenuItem key={index} value={country.name}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>
      {meta.touched && meta.error ? (
        <p className={styles.error_msg}>{meta.error.country}</p>
      ) : null}
    </div>
  );
}
