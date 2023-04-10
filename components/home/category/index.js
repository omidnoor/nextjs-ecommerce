import CategoryCard from "./CategoryCard";
import { women_accessories, women_dresses, women_shoes } from "@/data/home";

import styles from "./styles.module.scss";

export default function Category() {
  return (
    <div className={styles.category}>
      <CategoryCard
        header="DRESSES"
        products={women_dresses}
        background="#5a31f4"
      />

      <CategoryCard
        header="SHOES / HIGH HEELS"
        products={women_shoes}
        background="#3c811f"
      />

      <CategoryCard
        header="ACCESSORIES"
        products={women_accessories}
        background="#1c0025"
      />
    </div>
  );
}
