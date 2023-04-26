import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

export default function ListItem({ coupon, setCoupons }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const input = useRef(null);

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

  const updateHandler = async (id, name) => {
    try {
      const { data } = await axios.put(`/api/admin/coupon`, { id, name });
      setCoupons(data.coupons);
      setOpen(false);
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
      <input
        type="text"
        className={open ? styles.open : ""}
        value={discount ? `${discount}%` : `${coupon.discount}%`}
        onChange={(e) => setDiscount(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {open && (
        <div className={styles.list__item_expand}>
          <button
            onClick={() => updateHandler(coupon._id, coupon.name)}
            className={styles.btn}
          >
            Save
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setName("");
              setDiscount(0);
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
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => removeHandler(coupon._id)} />
      </div>
    </li>
  );
}
