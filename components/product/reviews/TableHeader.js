import { useState } from "react";
import TableSelect from "./TableSelect";

import styles from "./styles.module.scss";

// const ratings = ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"];

const ratings = [
  {
    text: "All",
    value: "",
  },
  {
    text: "5 star",
    value: 5,
  },
  {
    text: "4 star",
    value: 4,
  },
  {
    text: "3 star",
    value: 3,
  },
  {
    text: "2 star",
    value: 2,
  },
  {
    text: "1 star",
    value: 1,
  },
];

const orderOptions = [
  {
    text: "Recommended",
    value: "Recommended",
  },
  {
    text: "Most recent to oldest",
    value: "Most recent to oldest",
  },
  {
    text: "Oldest to most recent",
    value: "Oldest to most recent",
  },
];

export default function TableHeader({ reviews, allSizes, colors }) {
  const [rating, setRating] = useState(0);
  const [size, setSize] = useState(null);
  const [style, setStyle] = useState("");
  const [order, setOrder] = useState();

  return (
    <div className={styles.table__header}>
      <TableSelect
        props={rating}
        text="Rating"
        data={ratings.filter((r) => r.value !== rating)}
        onRatingChange={setRating}
      />

      <TableSelect
        props={size}
        text="Size"
        data={allSizes?.filter((s) => s.size !== size)}
        onSizeChange={setSize}
      />

      <TableSelect
        props={style}
        text="Style"
        data={colors?.filter((s) => s !== style)}
        onStyleChange={setStyle}
      />

      <TableSelect
        props={order}
        text="Order"
        data={orderOptions.filter((x) => x.value !== order)}
        onOrderChange={setOrder}
      />
    </div>
  );
}
