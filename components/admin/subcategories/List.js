import { useEffect } from "react";
import ListItem from "./ListItem";

import styles from "./styles.module.scss";

export default function List({ categories, subcategories, setSubcategories }) {
  return (
    <ul className={styles.list}>
      {subcategories?.map((subcategory, index) => (
        <ListItem
          categories={categories}
          subcategory={subcategory}
          setSubcategories={setSubcategories}
          key={index}
        />
      ))}
    </ul>
  );
}
