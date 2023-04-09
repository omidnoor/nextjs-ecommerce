import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function FlashCard({ product }) {
  const price = product.price;
  const discount = product.discount;
  const save = (price * discount) / 100;
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          <img src={product.image} alt="flash deals image" />
        </Link>

        <div className={styles.flash}>
          <MdFlashOn />
          <span>-${product.discount}%</span>
        </div>
      </div>

      <div className={styles.card__price}>
        <span>CAD{price}$</span>
        <span>CAD{Math.ceil(save)}$</span>
      </div>

      <div className={styles.card__bar}>
        <div className={styles.card__bar_inner} style={{ width: "60%" }}></div>
      </div>
      <div className={styles.card__percentage}>{product.sold}%</div>
    </div>
  );
}
