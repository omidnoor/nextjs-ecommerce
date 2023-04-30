import { useState } from "react";
import styles from "./styles.module.scss";
import { sizesList } from "@/data/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Sizes({ sizes, product, setProduct }) {
  const [noSizes, setNoSizes] = useState(false);
  const onSizeHandler = (e, index) => {
    const values = [...sizes];
    values[index][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values });
  };
  const onRemoveHandler = (index) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(index, 1);
      setProduct({ ...product, sizes: values });
    }
  };

  return (
    <div className={styles.sizes}>
      <div className={styles.header}>Sizes / Quantity / Price</div>
      <button
        type="reset"
        className={styles.click_btn}
        onClick={() => {
          if (!noSizes) {
            let data = sizes.map((size, index) => {
              return {
                qty: size.qty,
                price: size.price,
              };
            });
            setProduct({ ...product, sizes: data });
          } else {
            let data = sizes.map((size, index) => {
              return {
                size: size.size || "",
                qty: size.qty,
                price: size.price,
              };
            });
            setProduct({ ...product, sizes: data });
          }
          setNoSizes((prev) => !prev);
        }}
      >
        {noSizes
          ? "Click if product has sizes"
          : "Click if product has no sizes"}
      </button>
      {sizes?.map((size, index) => (
        <div className={styles.sizes__container} key={index}>
          <select
            name="size"
            value={noSizes ? "" : sizes.size}
            disabled={noSizes}
            style={{ display: `${noSizes ? "none" : ""}` }}
            onChange={(e) => onSizeHandler(e, index)}
          >
            <option value="">Select a size</option>
            {sizesList.map((sizeItem, index) => (
              <option key={index} value={sizeItem}>
                {sizeItem}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="qty"
            placeholder={noSizes ? "Product Quantity" : "Size Quantity"}
            min={1}
            value={sizes.qty}
            onChange={(e) => onSizeHandler(e, index)}
          />
          <input
            type="number"
            name="price"
            placeholder={noSizes ? "Product Price" : "Size Price"}
            min={1}
            value={sizes.price}
            onChange={(e) => onSizeHandler(e, index)}
          />
          {!noSizes ? (
            <>
              <BsFillPatchMinusFill onClick={() => onRemoveHandler(index)} />
              <BsFillPatchPlusFill
                onClick={() => {
                  setProduct({
                    ...product,
                    sizes: [
                      ...sizes,
                      {
                        size: "",
                        qty: "",
                        price: "",
                      },
                    ],
                  });
                }}
              />
            </>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}
