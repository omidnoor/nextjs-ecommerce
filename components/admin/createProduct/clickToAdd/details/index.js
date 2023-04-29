import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { useRef } from "react";
import { ErrorMessage, useField } from "formik";
import { showDialog } from "@/store/dialogSlice";
import { RiDeleteBin7Fill, RiShape2Line } from "react-icons/ri";
import { GiExtractionOrb } from "react-icons/gi";

export default function Sizes({
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
  const [meta, field] = useField({ ...props, name });
  const onImageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, index) => {
      if (index > 5 || images.length > 5) {
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
      } else if (
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
      } else if (img.size > 1024 * 1024) {
        dispatch(
          showDialog({
            header: "File too large",
            msgs: [
              {
                type: "error",
                msg: "File too large. Maximum 1Mb",
              },
            ],
          }),
        );
        files = files.filter((item) => item !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((prev) => [...prev, e.target.result]);
        };
      }
    });
  };

  const onRemoveHandler = (img) => {
    setImages((images) => images.filter((item) => item !== img));
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
          {header}
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
      <div className={styles.images__main}>
        <div
          className={`${styles.images__main_grid} ${
            images.length === 2
              ? styles.grid__two
              : images.length === 3
              ? styles.grid__three
              : images.length === 4
              ? styles.grid__four
              : images.length === 5
              ? styles.grid__five
              : images.length === 6
              ? styles.grid__six
              : ""
          }`}
        >
          {!images.length ? (
            <img src="/images/no_image.png" alt="no image" />
          ) : (
            images.map((img, index) => (
              <div className={styles.images__main_grid_wrap}>
                <div className={styles.blur}></div>
                <img key={index} src={img} alt="image" />
                <div className={styles.images__main_grid_actions}>
                  <button>
                    <RiDeleteBin7Fill onClick={() => onRemoveHandler(img)} />
                  </button>
                  <button>
                    <GiExtractionOrb onClick={() => setColorImage(img)} />
                  </button>
                  <button>
                    <RiShape2Line />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
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
