import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import SingularSelect from "@/components/selects/SingularSelect";

import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

export default function ListItem({
  categories,
  subcategory,
  setSubcategories,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const input = useRef(null);

  const removeHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/subcategory`, {
        data: { id },
      });
      setSubcategories(data?.subcategory);
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateHandler = async (id, name, parent) => {
    try {
      const { data } = await axios.put(`/api/admin/subcategory`, {
        id,
        name: name || subcategory?.name,
        parent: parent || subcategory?.parent._id,
      });
      // console.log("Server response for update:", data);
      setSubcategories(data.subcategory);
      setOpen(false);
      toast.success(data?.message);
    } catch (error) {
      // console.log(error.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <li className={styles.list__item}>
      <input
        type="text"
        className={open ? styles.open : ""}
        value={name ? name : subcategory?.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />

      {open && (
        <div className={styles.list__item_expand}>
          <select
            name={parent}
            value={parent || subcategory.parent._id}
            onChange={(e) => setParent(e.target.value)}
            disabled={!open}
            className={styles.select}
          >
            {categories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              updateHandler(subcategory?._id, subcategory?.name, parent);
              setOpen(!open);
            }}
            className={styles.btn}
          >
            Save
          </button>
          <button
            onClick={() => {
              setOpen(!open);
              setName("");
              setParent(parent || subcategory?.parent._id);
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
        <AiFillDelete onClick={() => removeHandler(subcategory?._id)} />
      </div>
    </li>
  );
}
