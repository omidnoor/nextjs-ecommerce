import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { Button, Rating } from "@mui/material";

import AddReviews from "./AddReviews";
import Table from "./Table";

import styles from "./styles.module.scss";

export default function Reviews({ product }) {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(product);
  function signInHandler() {
    signIn({ callbackUrl: router.asPath });
  }

  return (
    <div className={styles.reviews}>
      <div className={styles.review__container}>
        <h3>Customer Reviews ({product.reviews.length})</h3>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average Rating</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                style={{ color: "#FACF19" }}
              />
              {product.rating === 0 ? "No review" : product.rating}
            </div>
          </div>

          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, index) => (
              <div key={index} className={styles.reviews__stats_reviews_review}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - index}
                  readOnly
                  style={{ color: "#FACF19" }}
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {session ? (
          <AddReviews product={product} />
        ) : (
          <button className={styles.login_btn} onClick={signInHandler}>
            Login to add review
          </button>
        )}

        <Table
          reviews={product.reviews}
          allSizes={product.allSizes}
          colors={product.color}
        />
      </div>
    </div>
  );
}
