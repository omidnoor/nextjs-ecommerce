import { RingLoader } from "react-spinners";

import styles from "./styles.module.scss";

export default function RingLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <RingLoader color="#2f82ff" loading={loading} />
    </div>
  );
}
