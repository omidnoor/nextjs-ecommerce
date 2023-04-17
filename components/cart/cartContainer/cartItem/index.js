import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { updateCart, removeFromCart } from "@/store/cartSlice";

import styles from "./styles.module.scss";

export default function CartItem({ item }) {
  const { cart } = useSelector((state) => ({ ...state }));
  // console.log(cart);
  const dispatch = useDispatch();

  const updateQty = (type) => {
    dispatch(
      updateCart({
        ...item,
        qty: type === "plus" ? item.qty + 1 : item.qty - 1,
      }),
    );
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={`${styles.card} ${styles.product}`}>
      {item.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="/images/store.webp" alt="store" />
      </div>

      <div className={styles.product__image}>
        <div className={styles.checkbox}></div>
        <img src={item.images[0].url} alt="product image" />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h2>
              {item.name.length > 30
                ? `${item.name.substring(0, 30)}...`
                : item.name}
            </h2>
            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>
            <div style={{ zIndex: "2" }} onClick={() => removeItem(item._uid)}>
              <AiOutlineDelete />
            </div>
          </div>

          <div className={styles.product__style}>
            <img src={item.color.image} alt="product style" />
            {item.size && <span>{item.size.size}</span>}
            {item.size && <span>{item.size.price}$</span>}
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className={styles.product__price_qty}>
            <div className={styles.product__price_qty_price}>
              <span className={styles.price}>
                CAD{(item.price * item.qty).toFixed(2)}
              </span>
              {item.price !== item.priceBefore && (
                <span className={styles.price_before}>
                  CAD{(item.priceBefore * item.qty).toFixed(2)}
                </span>
              )}
              {item.discount > 0 && (
                <span className={styles.discount}>-{item.discount}%</span>
              )}
            </div>
            <div className={styles.product__price_qty_qty}>
              <button
                disabled={item.qty < 2}
                onClick={() => updateQty("minus")}
              >
                -
              </button>
              <span>{item.qty}</span>
              <button
                disabled={item.qty === item.quantity}
                onClick={() => updateQty("plus")}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.product__shipping}>
            {item.shipping ? `${item.shipping}$ shipping fee` : "Free shipping"}
          </div>
          {item.quantity < 1 && (
            <div className={styles.empty_stock}>
              This product is out of stock.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
