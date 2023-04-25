import ListItem from "./ListItem";

import styles from "./styles.module.scss";

export default function List({ categories, setCategories }) {
  return (
    <ul className={styles.list}>
      {categories.map((category, index) => (
        <ListItem
          category={category}
          setCategories={setCategories}
          key={index}
        />
      ))}
    </ul>
  );
}
