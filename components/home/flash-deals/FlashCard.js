import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";

export default function FlashCard({ product }) {
  return (
    <>
      <img src={product.image} alt="flash deals image" />
      <div className={styles.flash__card__discount}>
        <MdFlashOn />
        <span>{`-${product.discount}%`}</span>
      </div>
    </>
  );
}
