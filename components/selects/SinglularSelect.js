import { ErrorMessage, useField } from "formik";
import { MenuItem, TextField } from "@mui/material";

import styles from "./styles.module.scss";

export default function SinglularSelect({
  data,
  onChangeHandler,
  placeholder,
  ...rest
}) {
  const [field, meta] = useField(data);
  console.log(meta.error);
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
          meta.error && meta.touched && styles.error_select
        }`}
      >
        <MenuItem key={""} value={""}>
          No Selected / Or Empty
        </MenuItem>
        {data.map((country) => (
          <MenuItem key={country.value} value={country.value}>
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
