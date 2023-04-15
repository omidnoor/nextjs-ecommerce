import { useState } from "react";
import { Rating } from "@mui/material";

import Select from "./Select";
import Images from "./Images";

import styles from "./styles.module.scss";

const fits = ["Too Small", "Fit", "Too Large"];

export default function AddReviews({ product }) {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [images, setImages] = useState([]);

  const sizeHandler = (size) => {
    setSize(size);
  };

  const styleHandler = (style) => {
    setStyle(style);
  };

  const fitHandler = (style) => {
    setFit(style);
  };

  return (
    <div className={styles.reviews__add}>
      <div className={`${styles.flex} ${styles.wrap}`}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <Select
            props={size}
            text="Size"
            data={product?.allSizes?.filter((s) => s.size !== size)}
            onSizeChange={sizeHandler}
          />

          <Select
            props={style}
            text="Style"
            data={product?.color?.filter((s) => s !== style)}
            onStyleChange={styleHandler}
          />

          <Select
            props={fit}
            text="How does it fit"
            data={fits.filter((s) => s !== fit)}
            onFitChange={fitHandler}
          />
        </div>
        <Images images={images} setImages={setImages} />

        <textarea
          name="review"
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        ></textarea>

        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          precision={0.5}
          style={{ color: "faca19", fontSize: "2rem" }}
        />

        <button className={styles.login_btn}>Submit Review</button>
      </div>
    </div>
  );
}
