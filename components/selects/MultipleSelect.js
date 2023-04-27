import React, { useEffect, useState } from "react";
import { useField, ErrorMessage } from "formik";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/system";
import styles from "./styles.module.scss";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  width: "100%",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: 2,
}));

export default function MultipleSelect({
  data,
  onChangeHandler,
  value,
  name,
  header,
  disabled,
  ...rest
}) {
  const [subs, setSubs] = useState(data || []);
  const [field, meta] = useField({ ...rest, name });
  useEffect(() => {
    setSubs(data);
  }, [data]);
  const result = data.length
    ? data.reduce((obj, cur) => ({ ...obj, [cur._id]: cur.name }), {})
    : {};

  return (
    <div>
      <div
        className={`${styles.header} ${
          meta.error && meta.error[name] ? styles.header__error : ""
        }`}
      >
        <div className={styles.flex}>
          {meta.error && meta.error[name] && (
            <img src="../../../images/warning.png" alt="" />
          )}
          {header}
        </div>
        <span>
          {meta.touched && meta.error?.subCategories && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <FormControl>
        <StyledFormControl>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={value}
            onChange={onChangeHandler}
            name={name}
            disabled={disabled}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={result[value]} />
                ))}
              </div>
            )}
          >
            {result &&
              Object.keys(result).map((id) => {
                return (
                  <MenuItem key={id} value={id}>
                    <Checkbox checked={value.indexOf(id) > -1} />
                    <ListItemText primary={result[id]} />
                  </MenuItem>
                );
              })}
          </Select>
        </StyledFormControl>
      </FormControl>
    </div>
  );
}
