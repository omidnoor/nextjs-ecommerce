import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Rating from "@mui/material/Rating";
import { TbMinus, TbPlus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";

import Accordian from "../accordian";
import Share from "./Share";
import Similar from "./similar";
import { addToCart, updateCart } from "@/store/cartSlice";

import styles from "./styles.module.scss";

export default function ProductInfo({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const { cart } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setSize(router.query.size);
    setQty(1);
  }, [router.query.size]);

  useEffect(() => {
    qty > product.quantity && setQty(product.quantity);
  }, [router.query.size]);

  const addToCartHandler = async () => {
    try {
      if (!router.query.size) {
        setError("Please select a size");
      }
      const { data } = await axios.get(
        `/api/product/${product._id}?style=${product.style}&size=${
          router.query.size ? router.query.size : ""
        }`,
      );
      if (qty > data.quantity) {
        setError("This quantity is more than stock. Try a lower quantity");
      } else if (data.quantity < 1) {
        setError("This product is out of stock");
      } else {
        let _uid = `${data._id}_${product.style}_${router.query.size}`;
        let exist = cart.items?.find((p) => p._uid === _uid);

        if (exist) {
          dispatch(updateCart({ ...data, qty, size: data.size, _uid }));
        } else {
          dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
        }
      }
      setError(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.info__container}>
      <h1 className={styles.info__name}>{product.name}</h1>
      <h2 className={styles.info__sku}>{product.sku}</h2>
      <div className={styles.info__rating}>
        <Rating
          name="half-rating"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
          style={{ color: "#facf19" }}
        />
        {product.numReviews}
        {product.numReviews === 1 ? " review" : " reviews"}
      </div>
      <div className={styles.info__price}>
        {!size ? <h2>{product.priceRange}</h2> : <h2>{product.price}</h2>}
        {product.discount > 0 ? (
          <h3>
            <span>{product.priceBefore} </span>
            <span>(-{product.discount}%)</span>
          </h3>
        ) : (
          ""
        )}
      </div>

      <div className={styles.info__shipping}>
        {product.shipping
          ? `+${product.shipping}$ shipping fee`
          : `Free shipping`}
      </div>

      <div className={styles.info__qty}>
        {size
          ? `${product.quantity} pieces available`
          : `${product.sizes.reduce(
              (start, next) => start + next.qty,
              0,
            )} pieces available`}
      </div>

      <div className={styles.info__sizes}>
        <p className={styles.p}>Select a size : </p>
        <div className={styles.info__sizes_wrap}>
          {product.sizes.map((productSize, index) => (
            <Link
              key={index}
              href={`/product/${product.slug}?style=${router.query.style}&size=${index}`}
              onClick={() => setSize(productSize.size)}
            >
              <div
                className={`${styles.info__sizes_size} ${
                  index.toString() === router.query.size
                    ? styles.info__sizes_active
                    : ""
                }`}
              >
                {productSize.size}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.info__colors}>
        {product.color && `Select a color :`}
        {product.color &&
          product.color.map((color, index) => (
            <div
              key={index}
              className={`${styles.info__color} ${
                index.toString() === router.query.style
                  ? styles.active_color
                  : ""
              }`}
            >
              <Link href={`/product/${product.slug}?style=${index}`}>
                <img src={color.image} alt={`color ${index}`} />
              </Link>
            </div>
          ))}
      </div>

      <div className={styles.info__qty_order}>
        <span>Select quantity :</span>
        <button onClick={() => qty > 1 && setQty((prevQty) => prevQty - 1)}>
          <TbMinus />
        </button>
        <span>{qty}</span>
        <button
          onClick={() =>
            qty < product.quantity && setQty((prevQty) => prevQty + 1)
          }
        >
          <TbPlus />
        </button>
      </div>

      <div className={styles.info__actions}>
        {error && <p className={styles.error}>{error}</p>}
        <button
          disabled={product.quantity < 1}
          style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""} ` }}
          onClick={() => addToCartHandler()}
        >
          <BsHandbagFill />
          <b>ADD TO CART</b>
        </button>
        <button>
          <BsHeart />
          WISHLIST
        </button>
      </div>

      <div className={styles.info__shares}>
        <Share />
      </div>

      <div className={styles.info__accordians}>
        <Accordian details={[product.description, ...product.details]} />
      </div>

      <div className={styles.info__similar}>
        <Similar />
      </div>
    </div>
  );
}
