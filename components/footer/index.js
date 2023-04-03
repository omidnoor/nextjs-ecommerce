import Links from "./Links";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
      </div>
    </div>
  );
}
