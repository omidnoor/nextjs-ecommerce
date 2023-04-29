import { useState } from "react";
import styles from "./styles.module.scss";
import { sizesList } from "@/data/sizes";

export default function Sizes({ sizes, product, setProduct }) {
  const [noSizes, setNoSizes] = useState(false);
  console.log(product);
  return (
    <>
      <div className={styles.header}>Sizes / Quantity / Price</div>
      <button
        type="reset"
        className={styles.click_btn}
        onClick={() => setNoSizes((prev) => !prev)}
      >
        {noSizes
          ? "Click if product has sizes"
          : "Click if product has no sizes"}
      </button>
      {sizes?.map((size, index) => (
        <div className={styles.sizes} key={index}>
          <select
            name="size"
            value={noSizes ? "" : sizes.size}
            disabled={noSizes}
            style={{ display: `${noSizes ? "none" : ""}` }}
          >
            <option value="">Select a size</option>
            {sizesList.map((sizeItem, index) => (
              <option key={index} value={sizeItem}>
                {sizeItem}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}
