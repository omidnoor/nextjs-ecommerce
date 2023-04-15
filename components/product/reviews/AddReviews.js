import { useState } from "react";
import Select from "./Select";

import styles from "./styles.module.scss";

export default function AddReviews({ product }) {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");

  const sizeHandler = (size) => {
    setSize(size);
  };

  const styleHandler = (style) => {
    setStyle(style);
  };

  return (
    <div className={styles.reviews__add}>
      <div className={`${styles.flex} ${styles.wrap}`}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <Select
            props={size}
            text="Size"
            data={product.allSizes.filter((s) => s.size !== size)}
            onSizeChange={sizeHandler}
          />

          <Select
            props={style}
            text="Style"
            data={product.color?.filter((s) => s !== style)}
            onStyleChange={styleHandler}
          />
        </div>
      </div>
    </div>
  );
}
