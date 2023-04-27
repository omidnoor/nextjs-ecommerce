import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function ListItem({ coupon, setCoupons }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const input = useRef(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  const startDateHandler = (date) => {
    setStartDate(date);
  };

  const endDateHandler = (date) => {
    setEndDate(date);
  };

  const removeHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/coupon`, {
        data: { id },
      });
      setCoupons(data.coupons);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`/api/admin/coupon`, {
        id,
        coupon: name || coupon.coupon,
        discount: discount || coupon.discount,
        startDate: startDate || coupon.startDate,
        endDate: endDate || coupon.endDate,
      });
      setCoupons(data.coupons);
      setOpen(false);
      setName("");

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <li className={styles.list__item}>
      <input
        type="text"
        className={open ? styles.open : ""}
        value={name ? name : coupon.coupon}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />

      {open && (
        <div className={styles.list__item_expand}>
          <input
            type="text"
            className={open ? styles.open : ""}
            value={discount ? discount : coupon.discount}
            onChange={(e) => setDiscount(e.target.value)}
            disabled={!open}
            ref={input}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/dd/yyyy"
              value={startDate}
              onChange={startDateHandler}
              renderInput={(params) => (
                <TextField {...params} minDate={new Date()} />
              )}
            />
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/dd/yyyy"
              value={endDate}
              onChange={endDateHandler}
              renderInput={(params) => (
                <TextField {...params} minDate={new Date()} />
              )}
            />
          </LocalizationProvider>

          <button
            onClick={() => updateHandler(coupon._id)}
            className={styles.btn}
          >
            Save
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setName("");
              setDiscount(0);
              setStartDate(new Date());
              setEndDate(tomorrow);
            }}
            className={styles.btn}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_action}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen(true);
              input?.current?.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => removeHandler(coupon._id)} />
      </div>
    </li>
  );
}
