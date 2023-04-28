import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { useRef } from "react";
import { ErrorMessage, useField } from "formik";
import { showDialog } from "@/store/dialogSlice";

export default function Images({
  images,
  setImages,
  header,
  text,
  name,
  setColorImage,
  ...props
}) {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField(props);

  const onImageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, index) => {
      if (index === 5 || images.length === 6) {
        dispatch(
          showDialog({
            header: "Maximum 6 images are allowed",
            msgs: [
              {
                type: "error",
                msg: "Maximum 6 images are allowed",
              },
            ],
          }),
        );
        return;
      }
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/jpg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp"
      ) {
        dispatch(
          showDialog({
            header: "Unsopported file format",
            msgs: [
              {
                type: "error",
                msg: "Only JPEG, PNG and WEBP files are allowed",
              },
            ],
          }),
        );
        files = files.filter((item) => item !== img.name);
        return;
      }
    });
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          {meta.error && meta.error[name] && (
            <img src="/images/warning.png" alt="warning" />
          )}
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
        type="file"
        name={name}
        ref={fileInput}
        hidden
        multiple
        accept="images/jpeg,images/jpg,image/png,image/webp"
        onChange={onImageHandler}
      />
      <button
        type="reset"
        disabled={images.length === 6}
        style={{ opacity: `${images.length === 6 ? "0.5" : ""}` }}
        onClick={() => {
          fileInput.current.click();
        }}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        {text}
      </button>
    </div>
  );
}
