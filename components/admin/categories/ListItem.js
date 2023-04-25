import { useRef } from "react";
import { useState } from "react";

import styles from "./styles.module.scss";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

export default function ListItem({ category, setCategories }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const input = useRef(null);

  const removeHandler = async () => {};

  return (
    <li className={styles.list__item}>
      <input
        type="text"
        className={open ? styles.open : ""}
        value={name ? name : category.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />
      <div className={styles.list__item_action}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => removeHandler(category._id)} />
      </div>
    </li>
  );
}
