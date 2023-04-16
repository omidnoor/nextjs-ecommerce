import { useState } from "react";
import { Pagination } from "@mui/material";

import usePagination from "./Pagination";
import Review from "./Review";

import styles from "./styles.module.scss";

export default function Table({ reviews }) {
  const [page, setPage] = useState(1);

  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);
  console.log(reviews);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    _DATA.jump(newPage);
  };

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <div className={styles.table__data}>
          {_DATA.currentData().map((review, index) => (
            <Review review={review} key={index} />
          ))}
        </div>
        <div className={styles.table__pagination}>
          <Pagination
            count={count}
            page={page}
            variant="round"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
