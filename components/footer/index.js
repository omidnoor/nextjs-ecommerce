import Links from "./Links";
import Socials from "./Socials";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
      </div>
    </div>
  );
}
