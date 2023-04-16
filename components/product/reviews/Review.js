import { AiOutlineLike } from "react-icons/ai";
import { Rating } from "@mui/material";

import styles from "./styles.module.scss";

export default function Review({ review }) {
  const { name, image } = review.reviewBy;

  return (
    <div className={styles.review}>
      <div className={styles.flex}>
        <div className={styles.review__user}>
          <h4>
            {name?.slice(0, 1)}***{name?.slice(name?.length - 1, name?.length)}
          </h4>
          <img src={image} alt={name} />
        </div>
        <div className={styles.review__info}>
          <Rating
            name="half-rating-read"
            defaultValue={review.rating}
            readOnly
            style={{ color: "#FACF19" }}
          />
          <p>{review.review}</p>
          <div className={styles.review__info_inner}>
            <span>Overall Fit:</span>
            {review.fit}
            &nbsp;&nbsp;
            <span>Size:</span>
            {review.size}
            &nbsp;&nbsp;
            <div className={styles.flex}>
              <img
                src={review.style.image}
                alt="style"
                className={styles.review__img}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.review__images}>
          {review.images.length > 0 &&
            review.images.map((image, index) => (
              <img key={index} src={image?.url} alt="review image" />
            ))}
        </div>
        <div className={styles.review__extra}>
          <div className={styles.review__extra_likes}>
            {review.likes && review.likes?.likes}
            <AiOutlineLike />
          </div>
          <div className={styles.review__extra_date}>
            {review.updatedAt?.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
}
