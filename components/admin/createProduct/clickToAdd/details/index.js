import { useState } from "react";
import styles from "./styles.module.scss";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Details({ details, product, setProduct }) {
  const onDetailsHandler = (e, index) => {
    const values = [...details];
    values[index][e.target.name] = e.target.value;
    setProduct({ ...product, details: values });
  };
  const onRemoveHandler = (index) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(index, 1);
      setProduct({ ...product, details: values });
    }
  };

  console.log(product.details);

  return (
    <div className={styles.details}>
      <div className={styles.header}>Details</div>
      {details.length === 0 && (
        <BsFillPatchPlusFill
          onClick={() => {
            setProduct({
              ...product,
              details: [
                ...details,
                {
                  name: "",
                  value: "",
                },
              ],
            });
          }}
        />
      )}

      {details?.map((detail, index) => (
        <div className={styles.details__container} key={index}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            min={1}
            value={details.name}
            onChange={(e) => onDetailsHandler(e, index)}
          />
          <input
            type="text"
            name="value"
            placeholder="Value"
            min={1}
            value={details.value}
            onChange={(e) => onDetailsHandler(e, index)}
          />

          <>
            <BsFillPatchMinusFill onClick={() => onRemoveHandler(index)} />
            <BsFillPatchPlusFill
              onClick={() => {
                setProduct({
                  ...product,
                  details: [
                    ...details,
                    {
                      name: "",
                      value: "",
                    },
                  ],
                });
              }}
            />
          </>
        </div>
      ))}
    </div>
  );
}
