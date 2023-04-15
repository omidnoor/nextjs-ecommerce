import { MdOutlineRemoveCircle } from "react-icons/md";
import { useRef, useState } from "react";

import styles from "./styles.module.scss";

export default function Images({ images, setImages }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const imageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file, index) => {
      if (images.length === 3 || index === 2) {
        setError("Maximum 3 images are allowed");
        return;
      }

      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp"
      ) {
        setError(
          `${file.name} is not supported! Only jpeg, png, and webp images are supported`,
        );
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 4) {
        setError(`${file.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const removeImageHandler = (image) => {
    setImages((images) => images.filter((img) => img !== image));
  };

  return (
    <div className={styles.add_img}>
      <input
        type="file"
        name="file"
        id="images"
        ref={inputRef}
        hidden
        onChange={imageHandler}
        multiple
        accept="image/png,image/jpeg,image/webp"
      />
      <button
        className={styles.login_btn}
        style={{ width: "150px" }}
        onClick={() => inputRef.current.click()}
      >
        Add Images
      </button>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.imgs_wrap}>
        {images.length > 0 &&
          images.map((image, index) => (
            <span key={index}>
              <MdOutlineRemoveCircle
                onClick={() => removeImageHandler(image)}
              />
              <img src={image} alt="image" />
            </span>
          ))}
      </div>
    </div>
  );
}
