import { useState } from "react";
import { ErrorMessage, useField } from "formik";
import styles from "./styles.module.scss";
import { TbArrowUpRightCircle } from "react-icons/tb";
// import ImageColorExtractor from "./ImageColorExtractor";

export default function Colors({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const [toggle, setToggle] = useState(false);
  const [color, setColor] = useState([]);
  const [field, meta] = useField(props);

  const renderSwatches = () => {
    return color.map((color, index) => (
      <div
        className={styles.square__color}
        style={{ backgroundColor: color }}
        onClick={() =>
          setProduct({
            ...product,
            color: { color, image: product.color.image },
          })
        }
        key={index}
      >
        {color}
      </div>
    ));
  };

  return (
    <div className={styles.colors}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          {meta.error && <img src="/images/warning.png" alt="warning" />}
          Pick a product color
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error_msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="text"
        value={product.color.color}
        name={name}
        hidden
        {...field}
        {...props}
      />
      <div className={styles.colors__info}></div>
      <div className={toggle ? styles.toggle : ""}>
        <img src={colorImage} alt="color" style={{ display: "none" }} />
        <div className={styles.wheel}>{renderSwatches()}</div>
      </div>
      {color.length > 0 && (
        <TbArrowUpRightCircle
          className={styles.toggle__btn}
          onClick={() => setToggle((prev) => !prev)}
          style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
        />
      )}
      {/* <div>
        <ImageColorExtractor imageUrl="images/ad.jpg" />
      </div> */}
    </div>
  );
}
